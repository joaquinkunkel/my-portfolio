import React from "react";
import {
  faVideo,
  faCode,
  faPaintBrush,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import FeaturedCard from "./FeaturedCard";
import {
  Row,
  Weblink,
  FeaturedHeading,
  Caption,
  mapUrl,
  Map,
  MapContainer,
  svgGraph,
  BadgeCard,
  ProductHuntBadge,
  QuoteType,
  HighlightSpan,
  Section,
  GridList,
  StyledGraph,
  CardHeader,
  VimeoContainer,
  VimeoIframe,
} from "./StyledComponents"; // Ensure to import all the necessary styles and components
import VideoWithPlaceholder from "./VideoWithPlaceholder";
import CVListItem from "./CVListItem";
import MotionWrapper from "./MotionWrapper";
import VimeoPlayer from "./VimeoPlayer";

const video1Src =
  "https://cdn.prod.website-files.com/63cc43d53b100d36f4967cc3/63d2f441daf96d163e51ee8b_Powerful%20(large)-transcode.mp4";

const video2Src = "https://player.vimeo.com/video/912275371";

interface BubblesCardProps {
  onBackgroundClick: () => void;
  darkmode: boolean;
  isvisible?: boolean;
}

const BubblesFeaturedCard: React.FC<BubblesCardProps> = ({
  onBackgroundClick,
  darkmode,
  isvisible,
}) => {
  return (
    <FeaturedCard
      onBackgroundClick={onBackgroundClick}
      isvisible={isvisible}
      darkmode={darkmode}
    >
      <CardHeader darkmode={darkmode}>
        <Row noWrap>
          <div>
            <FeaturedHeading>Bubbles</FeaturedHeading>
            <Caption>UX & Front-end (Founding Team) • 2021 - 2024</Caption>
          </div>
          <Weblink
            href="https://usebubbles.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website
          </Weblink>
        </Row>
      </CardHeader>
      <Section>
        <MotionWrapper>
          <Row noPadding spaceBetween>
            <div>
              <QuoteType>
                At Bubbles, I design collaboration tools to make teams{" "}
                <HighlightSpan>
                  confident with how they use their time
                </HighlightSpan>
                .
              </QuoteType>
            </div>
            <VideoWithPlaceholder src={video1Src} />
          </Row>
        </MotionWrapper>
      </Section>
      <Row>
        <MotionWrapper fullWidth>
          <Section>
            <MapContainer>
              <Map src={mapUrl} alt="San Francisco Map" />
            </MapContainer>
            <div>
              San Francisco, CA
              <br />
              <Caption>Founding team of 6</Caption>
            </div>
          </Section>
        </MotionWrapper>
        <MotionWrapper fullWidth>
          <Section>
            <StyledGraph>{svgGraph}</StyledGraph>
            <div>ARR from $0 to $150K</div>
            <Caption>Since 2021</Caption>
          </Section>
        </MotionWrapper>
      </Row>
      <Row>
        <MotionWrapper>
          <Section>
            <GridList>
              <Caption>Highlights</Caption>
              <CVListItem icon={faVideo}>
                <>
                  Led the end-to-end UI development of 20+ features for an
                  conversational-AI-based productivity platform, building
                  mobile-responsive components in <b>React + Redux</b>.
                </>
              </CVListItem>
              <CVListItem icon={faCode}>
                Reduced user churn and boosted activation, building in-product
                onboarding flows and email marketing campaigns on Drip with
                dynamic user data.
              </CVListItem>
              <CVListItem icon={faPaintBrush}>
                Implemented a full rebrand and visual guidelines for a scalable
                design system.
              </CVListItem>
              <CVListItem icon={faHeadset}>
                Led user testing and interviews to improve UX, while managing
                customer support to address product pain points.
              </CVListItem>
            </GridList>
          </Section>
        </MotionWrapper>
      </Row>
      <MotionWrapper>
        <Row>
          <Section noPadding>
            <VideoWithPlaceholder src="https://cdn.prod.website-files.com/63cc43d53b100d36f4967cc3/63dcda70e1e0cef9efc2262f_use-case_cta-2-transcode.mp4" />
          </Section>
          <Section noPadding>
            <VideoWithPlaceholder src="https://cdn.prod.website-files.com/63cc43d53b100d36f4967cc3/63dcda6aa80e948d7d32fa6a_use-case_cta-1-transcode.mp4" />
          </Section>
        </Row>
      </MotionWrapper>
      {/* Product Hunt Badge */}
      <MotionWrapper>
        <BadgeCard>
          <a
            href="https://www.producthunt.com/products/bubbles#bubbles-for-teams"
            target="_blank"
          >
            <ProductHuntBadge
              src="/img/producthunt-badge.png"
              alt="Product Hunt product of the day"
            />
          </a>
        </BadgeCard>
      </MotionWrapper>
    </FeaturedCard>
  );
};

export default React.memo(BubblesFeaturedCard);
