import React from "react";
import {
  Caption,
  FeaturedHeading,
  MapContainer,
  Map,
  Row,
  Section,
  Weblink,
  StyledGraph,
  CardHeader,
  GridList,
  QuoteType,
} from "./StyledComponents";
import FeaturedCard from "./FeaturedCard";
import CVListItem from "./CVListItem";
import MotionWrapper from "./MotionWrapper";
import {
  faArrowTrendUp,
  faCode,
  faCodeBranch,
  faEarth,
  faPaintBrush,
  faWebAwesome,
} from "@fortawesome/free-solid-svg-icons";
import VideoWithPlaceholder from "./VideoWithPlaceholder";
import GIFWithPlaceholder from "./GIFWithPlaceholder";

interface CamblyCardProps {
  onBackgroundClick: () => void;
  darkmode: boolean;
  isvisible?: boolean;
}

const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4194,37.7749,12/600x300?access_token=pk.eyJ1Ijoiam9hcXVpbmt1bmtlbCIsImEiOiJjbTBraHNzajMxN2IwMm1xMnA1NHBqMDY3In0.QoxI3AJs0BryBFMJXh_jXQ`;

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

const video1Src =
  "https://framerusercontent.com/assets/W8vS7JIV88gxJB3lsilDB6oUKk.mp4";

const CamblyFeaturedCard: React.FC<CamblyCardProps> = ({
  onBackgroundClick,
  darkmode,
  isvisible,
}) => {
  return (
    <FeaturedCard
      onBackgroundClick={onBackgroundClick}
      darkmode={darkmode}
      isvisible={isvisible}
    >
      <CardHeader darkmode={darkmode}>
        <Row noWrap>
          <div>
            <FeaturedHeading>Cambly</FeaturedHeading>
            <Caption>UX lead and front-end • 2019 - 2021</Caption>
          </div>
          <Weblink
            href="https://cambly.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit website
          </Weblink>
        </Row>
      </CardHeader>
      <Row spaceBetween>
        <MotionWrapper fullWidth>
          <Section noPadding>
            <VideoWithPlaceholder src={video1Src} />
          </Section>
        </MotionWrapper>
        </Row>
        <Row>
        <MotionWrapper fullWidth>
          <QuoteType>
            I built high-converting web & mobile user flows for a language
            tutoring platform. My work included product-led growth and core experience flows.
          </QuoteType>
        </MotionWrapper>
      </Row>
      <Row extraPadding spaceBetween>
        <MotionWrapper fullWidth>
          <Section noPadding>
            <GIFWithPlaceholder
              src={
                "https://framerusercontent.com/images/4nDQJ6vKdXZwtOrOgLUxv3H4ew.gif"
              }
            />
          </Section>
        </MotionWrapper>
        <MotionWrapper fullWidth>
          <QuoteType>
            I made prototypes, React components, brand illustrations, and
            animated content. (Like this loading Lottie!)
          </QuoteType>
        </MotionWrapper>
      </Row>
      <Row extraPadding>
        <MotionWrapper fullWidth>
          <Section>
            <MapContainer>
              <Map src={mapUrl} alt="San Francisco Map" />
            </MapContainer>
            <div>
              San Francisco, CA
              <br />
              <Caption>Hybrid team</Caption>
            </div>
          </Section>
        </MotionWrapper>
        <MotionWrapper fullWidth>
          <Section>
            <StyledGraph>{svgGraph}</StyledGraph>
            <div>Solo UX designer</div>
            <Caption>Product team of 12 • Company of 100</Caption>
          </Section>
        </MotionWrapper>
      </Row>
      <MotionWrapper>
        <Row>
          <Section>
            <GridList>
              <Caption>Highlights</Caption>
              <CVListItem icon={faArrowTrendUp}>
                Managed UX design, achieving an 18% conversion boost by
                redesigning key onboarding flows in the adult and kids products
                on web, iOS, and Android.
              </CVListItem>
              <CVListItem icon={faCodeBranch}>
                Unified the design system in React and Figma by designing and
                building reusable, cross-platform components
              </CVListItem>
              <CVListItem icon={faEarth}>
                Led the redesign and React.js implementation of marketing
                website, prioritizing responsiveness and localization,
                partnering with global marketing teams to conduct A/B tests
                around signup metrics
              </CVListItem>
              <CVListItem icon={faPaintBrush}>
                Led a full rebrand & marketing guidelines
              </CVListItem>
            </GridList>
          </Section>
        </Row>
      </MotionWrapper>
    </FeaturedCard>
  );
};

export default React.memo(CamblyFeaturedCard);
