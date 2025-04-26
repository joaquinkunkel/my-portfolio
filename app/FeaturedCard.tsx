import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { Section, Weblink } from "./Styles";

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export type IFeaturedCard = "bubbles" | "cambly" | "freelance" | null;

export const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Controls the delay between animations of children
    },
  },
};
export type IFeaturedCardProps = {
  onBackgroundClick: () => void;
  darkmode?: boolean;
  children: React.ReactNode;
  isvisible?: boolean;
};

const FeaturedCard: React.FC<IFeaturedCardProps> = ({
  onBackgroundClick,
  darkmode,
  children,
  isvisible,
}) => {
  return (
    <CardBackground
      onClick={(e) => {
        onBackgroundClick();
        e.stopPropagation();
      }}
      isvisible={isvisible}
      darkmode={darkmode}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        style={{ width: "100%" }}
      >
        <Card
          isvisible={isvisible}
          onClick={(e) => {
            e.stopPropagation();
          }}
          darkmode={darkmode}
        >
          {children}
        </Card>
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
  ${({darkmode}) => (darkmode && 'background-color: rgba(10, 12, 14, 0.7);')}
`;

const Card = styled.div<{ isvisible?: boolean; darkmode?: boolean }>`
  background: rgba(225, 225, 225, 0.85);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  z-index: 11;
  font-weight: 400;
  border-radius: 14px;
  box-shadow:
    0px 28px 60px -28px rgba(0, 0, 0, 0.6),
    inset 0px 2px 2px -1px rgba(255, 255, 255, 0.6);
  outline: 1px solid rgba(0, 0, 0, 0.1);
  padding: 6px 20px 4px;
  font-family: "Radio Grotesk", "Supply", sans-serif;
  color: #373e49;
  line-height: 130%;
  position: relative;
  // transition: all 0.2s ease-out;
  bottom: ${({ isvisible }) => (isvisible ? "0" : "-80px")};
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

export default FeaturedCard;
