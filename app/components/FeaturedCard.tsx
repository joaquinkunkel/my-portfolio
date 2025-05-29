import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { Section, StyledFontAwesomeIcon, Weblink } from "./StyledComponents";
import { useCallback } from "react";
import {
  faClose,
} from "@fortawesome/free-solid-svg-icons";

export type FeaturedCard = "bubbles" | "cambly" | "freelance" | null;

export const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Controls the delay between animations of children
    },
  },
};

export interface IFeaturedCardProps {
  onBackgroundClick: () => void;
  darkmode?: boolean;
  children: React.ReactNode;
  isvisible?: boolean;
}

const FeaturedCard: React.FC<IFeaturedCardProps> = ({
  onBackgroundClick,
  darkmode,
  children,
  isvisible,
}) => {
  const handleBackgroundClick = useCallback(
    (e: any) => {
      onBackgroundClick();
      e.stopPropagation();
    },
    [onBackgroundClick],
  );
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);
  return (
    <CardBackground
      onClick={handleBackgroundClick}
      isvisible={isvisible}
      darkmode={darkmode}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        style={{ width: "100%" }}
      >
        <CardWrapper>
          <CloseButton darkmode={darkmode} onClick={handleBackgroundClick}>
            <StyledFontAwesomeIcon icon={faClose} />
          </CloseButton>
          <Card
            isvisible={isvisible}
            onClick={stopPropagation}
            darkmode={darkmode}
          >
            {children}
          </Card>
        </CardWrapper>
      </motion.div>
    </CardBackground>
  );
};

const CardBackground = styled.div<{ isvisible?: boolean; darkmode?: boolean }>`
  visibility: hidden;
  opacity: 0;
  ${({ isvisible }) => isvisible && "visibility: visible; opacity: 1"};
  opacity: ${({ isvisible }) => (isvisible ? 1 : 0)};
  height: 100%;
  width: 100%;
  padding: 40px;
  position: absolute;
  font-weight: bold;
  z-index: 11;
  background: rgba(0, 0, 0, 0.4);
  overflow: auto;
  backdrop-filter: blur(8px);
  ${({ darkmode }) => darkmode && "background-color: rgba(10, 12, 14, 0.7);"}
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Card = styled.div<{ isvisible?: boolean; darkmode?: boolean }>`
  background: rgba(225, 225, 225, 0.85);
  width: 100%;
  max-height: calc(100svh - 80px);
  overflow: auto;
  z-index: 11;
  font-weight: 400;
  border-radius: 20px;
  box-shadow:
    0px 28px 60px -28px rgba(0, 0, 0, 0.6),
    inset 0px 2px 2px -1px rgba(255, 255, 255, 0.6);
  outline: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0px 20px 4px;
  font-family: "Radio Grotesk", "Supply", sans-serif;
  color: #373e49;
  line-height: 130%;
  position: relative;
  ${({ darkmode }) =>
    darkmode &&
    css`
      background: rgba(20, 23, 29, 0.9);
      box-shadow: 0px 28px 60px -28px rgba(0, 0, 0, 0.6);
      outline: 1.2px solid rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.7);
      ${Section} {
        background: rgba(255, 255, 255, 0.03);
        // border: 1px solid rgba(255, 255, 255, 0.06);
      }
      ${Weblink} {
        background: #202330;
        &:hover {
          background: #404350;
        }
      }
    `}
`;

const CloseButton = styled.div<{ darkmode?: boolean }>`
  position: absolute;
  top: -8px;
  left: -8px;
  z-index: 100;
  background: red;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 0 4px;
  font-size: 18px;
  justify-content: center;
  background: rgba(225, 225, 225, 0.85);
  box-shadow:
    0px 4px 8px 0 rgba(0, 0, 0, 0.12),
    inset 0px 2px 2px -1px rgba(255, 255, 255, 0.6);
  color: rgba(20, 23, 29, 0.9);
  outline: 1px solid rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    background: ${({ darkmode }) => darkmode ? 'rgba(28, 31, 37, 1.0)' : 'rgba(225, 225, 225, 1.0)'};
    > ${StyledFontAwesomeIcon} {
      opacity: 0.8;
    }
  }
  ${({ darkmode }) =>
    darkmode &&
    css`
      background: rgba(28, 31, 37, 0.8);
      color: rgba(255, 255, 255, 1);
      outline: 1.2px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.12);
    `};
`;

export default FeaturedCard;
