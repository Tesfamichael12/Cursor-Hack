import { useEffect, useState } from "react";

export function useChromaCalm(sentimentScore: number) {
  const [backgroundColor, setBackgroundColor] = useState("hsl(200, 50%, 50%)");

  useEffect(() => {
    // Map sentiment score (-1 to 1) to HSL color hue (0 to 120)
    const hue = (sentimentScore + 1) * 60; // -1 -> 0 (red), 0 -> 60 (yellow), 1 -> 120 (green)
    setBackgroundColor(`hsl(${hue}, 50%, 90%)`);
  }, [sentimentScore]);

  return { backgroundColor };
}
