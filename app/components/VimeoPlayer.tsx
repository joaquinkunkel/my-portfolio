import React, { useEffect, useState, useRef } from "react";
import { featuredBoxShadow } from "./StyledComponents";
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

export const VideoLoadingOverlay = styled.div<{ isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: ${(props) => (props.isLoading ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: opacity 0.3s ease-out;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
