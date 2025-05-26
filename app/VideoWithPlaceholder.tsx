import React, { useCallback, useState } from "react";
import { StyledVideo, VideoPlaceholder } from "./Styles";

const VideoWithPlaceholder = () => {
  const [videoReady, setVideoReady] = useState(false);

  const triggerVideoReady = useCallback(() => {
    setVideoReady(true)
  }, [])

  return (
    <div>
      {!videoReady ? (
        <VideoPlaceholder />
      ) :
      <StyledVideo
        playsInline
        autoPlay
        loop
        muted
        src="https://cdn.prod.website-files.com/63cc43d53b100d36f4967cc3/63d2f441daf96d163e51ee8b_Powerful%20(large)-transcode.mp4"
        onCanPlay={triggerVideoReady} // Only show the video when it's ready
      />
      }
    </div>
  );
};

export default React.memo(VideoWithPlaceholder);