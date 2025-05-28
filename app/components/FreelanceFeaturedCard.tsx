import React, { useEffect, useState, useRef } from "react";
import {
  Caption,
  FeaturedHeading,
  MapContainer,
  Map,
  Row,
  Section,
  Weblink,
  StyledGraph,
  VimeoContainer,
  VimeoIframe,
  VideoLoadingOverlay,
  LoadingSpinner,
} from "./StyledComponents";
import FeaturedCard from "./FeaturedCard";
import CVListItem from "./CVListItem";
import MotionWrapper from "./MotionWrapper";
import Player from "@vimeo/player";

interface FreelanceCardProps {
  onBackgroundClick: () => void;
  darkmode: boolean;
  isvisible?: boolean;
}

const worldMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0,20,1.5/600x300?access_token=pk.eyJ1Ijoiam9hcXVpbmt1bmtlbCIsImEiOiJjbTBraHNzajMxN2IwMm1xMnA1NHBqMDY3In0.QoxI3AJs0BryBFMJXh_jXQ`;

const svgGraph = (
  <svg
    style={{ opacity: 0.7 }}
    width="calc(100% - 40px)"
    height="auto"
    viewBox="0 0 100 30"
  >
    <rect width="100" height="30" fill="rgba(56, 56, 66, 0.01)" />
    {[...Array(99)].map((_, i) => (
      <circle
        key={i}
        cx={(i % 10) * 10 + 5}
        cy={Math.floor(i / 10) * 10 + 5}
        r="2"
        fill="rgba(56, 56, 66, 0.3)"
      />
    ))}
    <circle cx="95" cy="5" r="4" fill="#000000" />
  </svg>
);

const FreelanceFeaturedCard: React.FC<FreelanceCardProps> = ({
  onBackgroundClick,
  darkmode,
  isvisible,
}) => {
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
    <FeaturedCard
      onBackgroundClick={onBackgroundClick}
      darkmode={darkmode}
      isvisible={isvisible}
    >
      <MotionWrapper>
        <Row noWrap>
          <div>
            <FeaturedHeading>Freelance work</FeaturedHeading>
            <Caption>Designing since 2011 (started at age 15)</Caption>
          </div>
          <Weblink
            href="https://behance.net/joaquinkunkel"
            target="_blank"
            rel="noopener noreferrer"
          >
            See on Behance
          </Weblink>
        </Row>
      </MotionWrapper>
      <MotionWrapper>
        <Row>
          <Section noPadding>
            <VimeoContainer>
              <VideoLoadingOverlay isLoading>
                <LoadingSpinner />
              </VideoLoadingOverlay>
              <VimeoIframe
                ref={iframeRef}
                src="https://player.vimeo.com/video/268515791?background=1"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                title="Motion & Animation Reel"
              />
            </VimeoContainer>
          </Section>
        </Row>
      </MotionWrapper>
    </FeaturedCard>
  );
};

export default React.memo(FreelanceFeaturedCard);
