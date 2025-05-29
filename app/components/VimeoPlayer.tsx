import React, { useEffect, useState, useRef } from "react";
import {
  VimeoContainer,
  VimeoIframe,
  VideoLoadingOverlay,
  LoadingSpinner,
} from "./StyledComponents";
import Player from "@vimeo/player";

interface VimeoPlayerProps {
  src: string;
  title: string;
}

const VimeoPlayer: React.FC<VimeoPlayerProps> = ({ src, title }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const player = new Player(iframeRef.current);

      player.on("loaded", () => {
        setIsVideoLoading(false);
      });

      player.on("error", (error: any) => {
        console.error("Vimeo player error:", error);
        setIsVideoLoading(false);
      });
    }
  }, []);
  return (
    <VimeoContainer>
      <VideoLoadingOverlay isLoading>
        <LoadingSpinner />
      </VideoLoadingOverlay>
      <VimeoIframe
        ref={iframeRef}
        src={src}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        title={title}
      />
    </VimeoContainer>
  );
};

export default React.memo(VimeoPlayer);
