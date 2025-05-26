import React from "react";
import { motion } from "framer-motion";
import {
  Caption,
  FeaturedHeading,
  indented,
  MapContainer,
  Map,
  Row,
  Section,
  Weblink,
  StyledGraph,
} from "./Styles";
import FeaturedCard, { fadeInUp } from "./FeaturedCard";
import CVListItem from "./CVListItem";

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
      <motion.div variants={fadeInUp}>
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
      </motion.div>
      <Row>
        <Section>
          <motion.div variants={fadeInUp} style={{ width: "100%" }}>
            <MapContainer>
              <Map src={mapUrl} alt="San Francisco Map" />
            </MapContainer>
            <div>
              San Francisco, CA
              <br />
              <Caption>Hybrid team</Caption>
            </div>
          </motion.div>
        </Section>
        <Section>
          <motion.div variants={fadeInUp} style={{ width: "100%" }}>
            <StyledGraph>{svgGraph}</StyledGraph>
            <div>Solo UX designer</div>
            <Caption>Product team of 12 • Company of 100</Caption>
          </motion.div>
        </Section>
      </Row>
      <motion.div variants={fadeInUp}>
        <Row>
          <Section>
              <CVListItem>Owned UX for iOS, Android & web features</CVListItem>
              <CVListItem>Implemented web features in React</CVListItem>
              <CVListItem>Boosted free-trial conversion by 10% in adult and kids products</CVListItem>
              <CVListItem>Full rebrand & marketing guidelines</CVListItem>
          </Section>
        </Row>
      </motion.div>
    </FeaturedCard>
  );
};

export default React.memo(CamblyFeaturedCard);
