import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { Section, StyledFontAwesomeIcon, Weblink } from "./StyledComponents";
import { useCallback } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export type FeaturedCard = "bubbles" | "cambly" | "freelance" | "contact" | null;

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
            <CardContent>{children}</CardContent>
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
  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
`;

const Card = styled.div<{ isvisible?: boolean; darkmode?: boolean }>`
  background: rgba(225, 225, 225, 0.7);
  width: 100%;
  overflow: hidden; // Changed from auto to hidden
  z-index: 11;
  font-weight: 400;
  border-radius: 24px;
  box-shadow:
    0px 28px 60px -28px rgba(0, 0, 0, 0.6),
    inset 0px 2px 2px -1px rgba(255, 255, 255, 0.6);
  outline: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0; // Remove padding here
  font-family: "Radio Grotesk", "Supply", sans-serif;
  color: #272e39;
  line-height: 130%;
  position: relative;
  transition: .3s ease-out all;
  ${({ darkmode }) =>
    darkmode &&
    css`
      background: rgba(35, 38, 44, 0.9);
      box-shadow: 0px 28px 60px -28px rgba(0, 0, 0, 0.6);
      outline: 1.2px solid rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.8);
      ${Section} {
        background: rgba(255, 255, 255, 0.03);
      }
      ${Weblink} {
        &:hover {
          background: #404350;
        }
      }
    `}
`;

// Add a new inner wrapper for scrollable content
const CardContent = styled.div`
  padding: 0px 20px 20px;
  overflow: auto;
  max-height: calc(100svh - 80px);
  height: 100%;
  /* Webkit browsers */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 24px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 24px;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;

    @media (max-width: 600px) {
    max-height: calc(100svh - 32px);
  }
`;

const CloseButton = styled.div<{ darkmode?: boolean }>`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 100;
  background: red;
  height: 20px;
  width: 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 0 4px;
  font-size: 12px;
  justify-content: center;
  transition: 0.1s all;
  background: rgba(200, 200, 200, 0.85);
  color: rgba(20, 23, 29, 0.9);
  > ${StyledFontAwesomeIcon} {
    width: 14px;
    height: 14px; 
    opacity: 0.5;
  }
  &:hover {
    cursor: pointer;
    background: ${({ darkmode }) =>
      darkmode ? "rgba(250, 100, 100, 1.0)" : "rgba(250, 100, 100, 1.0)"};
      color: rgba(20, 23, 29, 0.9);
    > ${StyledFontAwesomeIcon} {
      opacity: 0.8;
    }
  }
  ${({ darkmode }) =>
    darkmode &&
    css`
      background: rgba(55, 58, 64, 0.8);
      color: rgba(255, 255, 255, 1);
    `};
`;

export default FeaturedCard;
