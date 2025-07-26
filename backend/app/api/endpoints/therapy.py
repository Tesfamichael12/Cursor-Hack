from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Request
import asyncio
import json
from app.services.sentiment import get_mock_sentiment_score

router = APIRouter()

# Simplified webhook receiver – logs incoming payload without signature verification
@router.post("/webhook")
async def webhook_receiver(request: Request):
    try:
        payload = await request.json()
    except Exception:
        payload = (await request.body()).decode("utf-8")
    print("Received LiveKit webhook:", payload)
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
