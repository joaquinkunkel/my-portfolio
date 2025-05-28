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
} from "./StyledComponents";
import FeaturedCard from "./FeaturedCard";
import CVListItem from "./CVListItem";
import MotionWrapper from "./MotionWrapper";

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
            <Caption>Lead product designer • 2019 - 2021</Caption>
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
      <Row>
        <Section>
          <MotionWrapper fullWidth>
            <MapContainer>
              <Map src={mapUrl} alt="San Francisco Map" />
            </MapContainer>
            <div>
              San Francisco, CA
              <br />
              <Caption>Hybrid team</Caption>
            </div>
          </MotionWrapper>
        </Section>
        <Section>
          <MotionWrapper fullWidth>
            <StyledGraph>{svgGraph}</StyledGraph>
            <div>Solo UX designer</div>
            <Caption>Product team of 12 • Company of 100</Caption>
          </MotionWrapper>
        </Section>
      </Row>
      <MotionWrapper>
        <Row>
          <Section>
              <CVListItem>Owned UX for iOS, Android & web features</CVListItem>
              <CVListItem>Implemented web features in React</CVListItem>
              <CVListItem>Boosted free-trial conversion by 10% in adult and kids products</CVListItem>
              <CVListItem>Full rebrand & marketing guidelines</CVListItem>
          </Section>
        </Row>
      </MotionWrapper>
    </FeaturedCard>
  );
};

export default React.memo(CamblyFeaturedCard);
