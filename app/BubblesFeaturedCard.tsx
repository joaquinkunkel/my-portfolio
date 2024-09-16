import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faCode, faPaintBrush, faHeadset } from "@fortawesome/free-solid-svg-icons";
import FeaturedCard, { fadeInUp } from "./FeaturedCard";
import {
  liStyle,
  iconStyle,
  Row,
  Weblink,
  FeaturedHeading,
  Caption,
  mapUrl,
  mapStyle,
  mapContainerStyle,
  graphStyle,
  svgGraph,
  StyledVideo,
  BadgeCard,
  ProductHuntBadge,
  QuoteType,
  HighlightSpan,
  Section,
} from "./Styles"; // Ensure to import all the necessary styles and components

interface BubblesCardProps {
  onBackgroundClick: () => void;
  darkMode: boolean;
  isVisible?: boolean;
}

const BubblesFeaturedCard: React.FC<BubblesCardProps> = ({
  onBackgroundClick,
  darkMode,
  isVisible,
}) => {
  return (
    <FeaturedCard onBackgroundClick={onBackgroundClick} isVisible={isVisible} darkMode={darkMode}>
      <motion.div variants={fadeInUp}>
        <Row noWrap>
          <div>
            <FeaturedHeading>Bubbles</FeaturedHeading>
            <Caption>UX & Front-end (Founding Team) • 2021 - Now</Caption>
          </div>
          <Weblink href="https://usebubbles.com" target="_blank" rel="noopener noreferrer">
            Visit website
          </Weblink>
        </Row>
      </motion.div>
        <Section>
      <motion.div variants={fadeInUp}>
        <Row noPadding spaceBetween>
          <div>
            <QuoteType>
              At Bubbles, I design collaboration tools to make teams{" "}
              <HighlightSpan>confident with how they use their time</HighlightSpan>.
            </QuoteType>
          </div>
          <VideoWithPlaceholder />
        </Row>
      </motion.div>
        </Section>

      <Row>
        <motion.div variants={fadeInUp}>
          <Section>

          <Caption style={{ marginBottom: 8 }}>Highlights</Caption>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <li style={liStyle}>
              <FontAwesomeIcon icon={faVideo} style={iconStyle} />
              Co-led end-to-end UX for video conversation tools to reduce the need for live meetings.
            </li>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <li style={liStyle}>
              <FontAwesomeIcon icon={faCode} style={iconStyle} />
              Designed and implemented growth flows in React + Redux with direct regard to conversion and churn metrics.
            </li>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <li style={liStyle}>
              <FontAwesomeIcon icon={faPaintBrush} style={iconStyle} />
              Full rebrand and visual guidelines for a scalable design system.
            </li>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <li style={liStyle}>
              <FontAwesomeIcon icon={faHeadset} style={iconStyle} />
              Co-managed customer support to gain direct insights into pain points and improve the overall E2E experience.
            </li>
          </div>
          </Section>
        </motion.div>
      </Row>

      <Row>
        <motion.div variants={fadeInUp} style={{width: '100%'}}>
          <Section>
            <div style={mapContainerStyle}>
              <img src={mapUrl} alt="San Francisco Map" style={mapStyle} />
            </div>
            <div>
              San Francisco, CA
              <br />
              <Caption>Founding team of 6</Caption>
            </div>
          </Section>
        </motion.div>

        <motion.div variants={fadeInUp} style={{width: '100%'}}>
          <Section>
            <div style={graphStyle}>{svgGraph}</div>
            <div>ARR from $0 to $150K</div>
            <Caption>Since 2021</Caption>
          </Section>
        </motion.div>
      </Row>

      {/* Product Hunt Badge */}
      <motion.div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }} variants={fadeInUp}>
        <BadgeCard>
          <a href="https://www.producthunt.com/products/bubbles#bubbles-for-teams" target="_blank">
            <ProductHuntBadge src="/img/producthunt-badge.png" />
          </a>
        </BadgeCard>
      </motion.div>
    </FeaturedCard>
  );
};

export default React.memo(BubblesFeaturedCard);


const VideoWithPlaceholder = () => {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div>
      {!videoReady && (
        <div
          style={{
            width: "230px",
            height: "160px",
            backgroundColor: "#e0e0e0",
            borderRadius: "6px",
          }}
        ></div>
      )}
      <StyledVideo
        playsInline
        autoPlay
        loop
        muted
        src="https://cdn.prod.website-files.com/63cc43d53b100d36f4967cc3/63d2f441daf96d163e51ee8b_Powerful%20(large)-transcode.mp4"
        onCanPlay={() => setVideoReady(true)} // Only show the video when it's ready
        style={{ display: videoReady ? "block" : "none" }} // Hide video until ready
      />
    </div>
  );
};
