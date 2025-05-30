import React, { useEffect, useState, useRef } from "react";
import { featuredBoxShadow, LoadingSpinner, VideoLoadingOverlay } from "./StyledComponents";
import Player from "@vimeo/player";
import { styled } from "styled-components";

interface VimeoPlayerProps {
  src: string;
  title: string;
  squareAspectRatio?: boolean;
}

const VimeoPlayer: React.FC<VimeoPlayerProps> = ({ src, title, squareAspectRatio }) => {
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
    <VimeoContainer squareAspectRatio={squareAspectRatio}>
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

export const VimeoContainer = styled.div<{ squareAspectRatio ?: boolean }>`
  padding: ${({ squareAspectRatio }) => squareAspectRatio ? '100% 0 0 0': '56.25% 0 0 0'};
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  outline: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: ${featuredBoxShadow};
`;

export const VimeoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;