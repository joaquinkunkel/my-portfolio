import React, { useCallback, useState } from "react";
import { LoadingSpinner, StyledSource, StyledVideo, VideoContainer, VideoLoadingOverlay } from "./StyledComponents";

interface VideoWithPlaceholderProps {
    src: string;
}

const VideoWithPlaceholder: React.FC<VideoWithPlaceholderProps> = (({ src }) => {
  const [videoReady, setVideoReady] = useState(false);

  const triggerVideoReady = useCallback(() => {
    setVideoReady(true)
  }, [])

  return (
    <VideoContainer isLoading={!videoReady}>
      <VideoLoadingOverlay isLoading={!videoReady}>
        <LoadingSpinner />
      </VideoLoadingOverlay>
      <StyledVideo
        playsInline
        autoPlay
        loop
        muted
        isReady={videoReady}
        onCanPlay={triggerVideoReady} // Only show the video when it's ready
      >
        <StyledSource isReady={videoReady} src={src} />
      </StyledVideo>
    </VideoContainer>
  );
});

export default React.memo(VideoWithPlaceholder);