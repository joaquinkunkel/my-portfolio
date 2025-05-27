import React, { useCallback, useState } from "react";
import { StyledVideo, VideoPlaceholder } from "./StyledComponents";

interface VideoWithPlaceholderProps {
    src: string;
}

const VideoWithPlaceholder: React.FC<VideoWithPlaceholderProps> = (({ src }) => {
  const [videoReady, setVideoReady] = useState(false);

  const triggerVideoReady = useCallback(() => {
    setVideoReady(true)
  }, [])

  return (
    <div>
      {!videoReady && (
        <VideoPlaceholder />
      )}
      <StyledVideo
        playsInline
        autoPlay
        loop
        muted
        src={src}
        isReady={videoReady}
        onCanPlay={triggerVideoReady} // Only show the video when it's ready
      />
    </div>
  );
});

export default React.memo(VideoWithPlaceholder);