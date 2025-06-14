import React from "react";
import {
  Caption,
  FeaturedHeading,
  Row,
  CardHeader,
} from "./StyledComponents";
import FeaturedCard from "./FeaturedCard";
import MotionWrapper from "./MotionWrapper";
import CVListItem from "./CVListItem";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faBehance, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

interface ContactCardProps {
  onBackgroundClick: () => void;
  darkmode: boolean;
  isvisible?: boolean;
}

const ContactFeaturedCard: React.FC<ContactCardProps> = ({
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
            <FeaturedHeading>Let&apos;s talk!</FeaturedHeading>
            <Caption>
              Want to work together or just chat? Let&apos;s connect below:
            </Caption>
          </div>
        </Row>
      </CardHeader>
      <div className="flex flex-col gap-3">
        <MotionWrapper>
          <Link
            className="flex gap-4 items-center"
            href="mailto:joaquinkunkel@gmail.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <CVListItem icon={faEnvelope}>
              <p className="pt-1">Email</p>
            </CVListItem>
          </Link>
          <p className="px-9 cursor-text">joaquinkunkel@gmail.com</p>
        </MotionWrapper>
        <MotionWrapper>

        <Link
          className="flex gap-4 items-center"
          href="https://linkedin.com/in/joaquinkunkel"
          rel="noopener noreferrer"
          target="_blank"
          >
          <CVListItem icon={faLinkedin}>
            <p className="pt-1">LinkedIn</p>
          </CVListItem>
        </Link>
          </MotionWrapper>
                  <MotionWrapper>

        <Link
          className="flex gap-4 items-center"
          href="https://github.com/joaquinkunkel"
          rel="noopener noreferrer"
          target="_blank"
        >
          <CVListItem icon={faGithub}>
            <p className="pt-1">GitHub</p>
          </CVListItem>
        </Link>
        </MotionWrapper>
                          <MotionWrapper>

        <Link
          className="flex gap-4 items-center"
          href="https://behance.net/joaquinkunkel"
          rel="noopener noreferrer"
          target="_blank"
        >
          <CVListItem icon={faBehance}>
            <p className="pt-1">Behance</p>
          </CVListItem>
        </Link>
        </MotionWrapper>
      </div>
    </FeaturedCard>
  );
};

export default React.memo(ContactFeaturedCard);
