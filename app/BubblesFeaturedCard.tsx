import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faCode, faPaintBrush, faHeadset } from "@fortawesome/free-solid-svg-icons";
import FeaturedCard, { fadeInUp } from "./FeaturedCard";
import {
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
  BadgeCard,
  ProductHuntBadge,
  QuoteType,
  HighlightSpan,
  Section,
  GridList,
} from "./Styles"; // Ensure to import all the necessary styles and components
import VideoWithPlaceholder from "./VideoWithPlaceholder";

const bubblesVideoSrc = "https://cdn.prod.website-files.com/63cc43d53b100d36f4967cc3/63d2f441daf96d163e51ee8b_Powerful%20(large)-transcode.mp4";

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
    <FeaturedCard onBackgroundClick={onBackgroundClick} isvisible={isvisible} darkmode={darkmode}>
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
          <VideoWithPlaceholder src={bubblesVideoSrc} />
        </Row>
      </motion.div>
        </Section>

      <Row>
        <motion.div variants={fadeInUp}>
          <Section>
            <GridList>
              <Caption style={{ marginBottom: 8 }}>Highlights</Caption>
              <FontAwesomeIcon icon={faVideo} style={iconStyle} />
              <p>
                  Led the end-to-end UI development of 20+ features for an conversational-AI-based productivity platform, building mobile-responsive components in <b>React + Redux</b>.
              </p>
              <p>
              <FontAwesomeIcon icon={faCode} style={iconStyle} />
              </p>
              <p>
                Reduced user churn and boosted activation, building in-product onboarding flows and email marketing campaigns on Drip with dynamic user data.
              </p>
              <FontAwesomeIcon icon={faPaintBrush} style={iconStyle} />
              <p>
                Implemented a full rebrand and visual guidelines for a scalable design system.
              </p>
              <FontAwesomeIcon icon={faHeadset} style={iconStyle} />
              <p>
                Led user testing and interviews to improve UX, while managing customer support to address product pain points.
              </p>
            </GridList>
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
