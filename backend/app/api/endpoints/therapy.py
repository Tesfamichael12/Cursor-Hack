from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Request, HTTPException
from livekit import api
import asyncio
import json
from app.services.sentiment import get_mock_sentiment_score
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

LIVEKIT_API_KEY = os.getenv("LIVEKIT_API_KEY")
LIVEKIT_API_SECRET = os.getenv("LIVEKIT_API_SECRET")

auth_handler = api.WebhookReceiver(LIVEKIT_API_KEY, LIVEKIT_API_SECRET)

@router.post("/webhook")
async def webhook_receiver(request: Request):
    body = await request.body()
    event = auth_handler.receive(body.decode("utf-8"), request.headers.get("Authorization"))

    if event.event == "participant_joined":
        print(f"Participant {event.participant.identity} joined room {event.room.name}")
    elif event.event == "participant_left":
        print(f"Participant {event.participant.identity} left room {event.room.name}")

    return {"status": "ok"}


async def sentiment_generator(websocket: WebSocket):
    while True:
        await asyncio.sleep(5)
        score = get_mock_sentiment_score()
        await websocket.send_text(json.dumps({"type": "sentiment", "score": score}))


@router.websocket("/ws/therapy/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    await websocket.accept()
    sentiment_task = asyncio.create_task(sentiment_generator(websocket))
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message text was: {data}, from session {session_id}")
    except WebSocketDisconnect:
        print(f"Client disconnected from session {session_id}")
        sentiment_task.cancel()
