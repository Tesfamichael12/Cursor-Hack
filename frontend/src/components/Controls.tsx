"use client";

import { TrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";

export default function Controls() {
  return (
    <div className="flex items-center justify-center gap-4">
      <TrackToggle source={Track.Source.Microphone}></TrackToggle>
      <TrackToggle source={Track.Source.Camera}></TrackToggle>
    </div>
  );
}
