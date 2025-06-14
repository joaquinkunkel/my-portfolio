import React from "react";
import {
  Caption,
  FeaturedHeading,
  Row,
  Section,
  Weblink,
  CardHeader,
  QuoteType,
} from "./StyledComponents";
import FeaturedCard from "./FeaturedCard";
import MotionWrapper from "./MotionWrapper";
import VimeoPlayer from "./VimeoPlayer";

interface FreelanceCardProps {
  onBackgroundClick: () => void;
  darkmode: boolean;
  isvisible?: boolean;
}

const FreelanceFeaturedCard: React.FC<FreelanceCardProps> = ({
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
        <MotionWrapper>
          <Row noWrap>
            <div>
              <FeaturedHeading>Freelance work</FeaturedHeading>
              <Caption>2011 - now</Caption>
            </div>
            <Weblink
              href="https://behance.net/joaquinkunkel"
              target="_blank"
              rel="noopener noreferrer"
              darkmode={darkmode}
            >
              See more on Behance
            </Weblink>
          </Row>
        </MotionWrapper>
      </CardHeader>
      <MotionWrapper>
        <Row spaceBetween>
          <Section noPadding>
            <VimeoPlayer
              src="https://player.vimeo.com/video/312047168?background=1"
              title="Coursedog ad"
              squareAspectRatio
            />
          </Section>
          <QuoteType>
            Apart from UX and engineering, I make motion graphics for marketing
            and UI.
          </QuoteType>
        </Row>
      </MotionWrapper>
      <MotionWrapper>
        <Row>
          <Section noPadding>
            <VimeoPlayer
              title="Motion & Animation Reel"
              src="https://player.vimeo.com/video/268515791?background=1"
            />
          </Section>
        </Row>
      </MotionWrapper>
    </FeaturedCard>
  );
};

export default React.memo(FreelanceFeaturedCard);
