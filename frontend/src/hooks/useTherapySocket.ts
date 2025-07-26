import { useEffect, useRef, useState } from "react";

interface SentimentMessage {
  type: "sentiment";
  score: number;
}

type TherapyMessage = string | SentimentMessage;

export function useTherapySocket(sessionId: string) {
  const [messages, setMessages] = useState<string[]>([]);
  const [sentimentScore, setSentimentScore] = useState(0);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const socket = new WebSocket(
      `ws://localhost:8000/api/therapy/ws/therapy/${sessionId}`
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const message: TherapyMessage = JSON.parse(event.data);
      if (typeof message === "object" && message.type === "sentiment") {
        setSentimentScore(message.score);
      } else {
        setMessages((prev) => [...prev, event.data]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [sessionId]);

  const sendMessage = (message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  };

  return { messages, sendMessage, sentimentScore };
}
