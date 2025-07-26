"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const joinRoom = () => {
    if (roomName) {
      router.push(`/therapy/${roomName}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-md items-center justify-between text-center">
        <h1 className="text-4xl font-bold mb-8">AI Therapist</h1>
        <p className="text-lg mb-8">
          Welcome to your personal AI-powered therapy session.
          <br />
          Please enter a room name to begin.
        </p>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter a room name..."
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && joinRoom()}
          />
          <Button onClick={joinRoom}>Join Session</Button>
        </div>
      </div>
    </main>
  );
}
