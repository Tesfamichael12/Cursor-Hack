"use client";

import { useChromaCalm } from "@/hooks/useChromaCalm";

export default function ChromaCalm({
  sentimentScore,
  children,
}: {
  sentimentScore: number;
  children: React.ReactNode;
}) {
  const { backgroundColor } = useChromaCalm(sentimentScore);

  return (
    <div
      style={{
        backgroundColor,
        transition: "background-color 1s ease-in-out",
      }}
    >
      {children}
    </div>
  );
} 