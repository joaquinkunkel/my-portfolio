import React, { useCallback, useState } from "react";
import { LoadingSpinner, StyledVideo, VideoLoadingOverlay, VideoPlaceholder } from "./StyledComponents";

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
      <VideoLoadingOverlay isLoading={!videoReady}>
        <LoadingSpinner />
      </VideoLoadingOverlay>
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