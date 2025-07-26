"use client";

import {
  VideoTrack,
  useTracks,
  TrackReference,
} from "@livekit/components-react";
import { Track } from "livekit-client";

function isTrackReference(trackRef: unknown): trackRef is TrackReference {
  return (trackRef as TrackReference)?.publication !== undefined;
}

export default function VideoView() {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tracks.filter(isTrackReference).map((trackRef) => (
        <VideoTrack key={trackRef.publication.trackSid} trackRef={trackRef} />
      ))}
    </div>
  );
}
