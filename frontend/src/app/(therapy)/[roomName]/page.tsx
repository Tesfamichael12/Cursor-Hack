"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { useParams, useRouter } from "next/navigation";
import { useTherapySocket } from "@/hooks/useTherapySocket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChromaCalm from "@/components/ChromaCalm";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function TherapyRoom() {
  const [token, setToken] = useState("");
  const { roomName } = useParams<{ roomName: string }>();
  const router = useRouter();
  const { messages, sendMessage, sentimentScore } = useTherapySocket(roomName);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const username = `user-${Math.random().toString(36).substring(7)}`;

    (async () => {
      try {
        const resp = await fetch(
          `/api/token?room=${roomName}&username=${username}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [roomName]);

  if (token === "") {
    return <div>Getting token...</div>;
  }

  return (
    <ChromaCalm sentimentScore={sentimentScore}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex h-screen">
        <div className="w-3/4 h-full">
          <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            data-lk-theme="default"
            style={{ height: "100%" }}
            onDisconnected={() => router.push("/")}
          >
            <VideoConference />
          </LiveKitRoom>
        </div>
        <div className="w-1/4 h-full flex flex-col p-4 border-l bg-white bg-opacity-20">
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Chat</h2>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewMessage(e.target.value)
              }
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && (sendMessage(newMessage), setNewMessage(""))
              }
            />
            <Button
              onClick={() => (sendMessage(newMessage), setNewMessage(""))}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </ChromaCalm>
  );
}
