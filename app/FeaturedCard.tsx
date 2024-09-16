import styled from "styled-components";
import { motion } from "framer-motion";

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
  darkMode?: boolean;
  children: React.ReactNode;
  isVisible?: boolean;
};

const FeaturedCard: React.FC<IFeaturedCardProps> = ({
  onBackgroundClick,
  darkMode,
  children,
  isVisible,
}) => {
  return (
    <CardBackground
      onClick={(e) => {
        onBackgroundClick();
        e.stopPropagation();
      }}
      isVisible={isVisible}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        style={{ width: "100%" }}
      >
        <Card
          isVisible={isVisible}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </Card>
      </motion.div>
    </CardBackground>
  );
};

const Card = styled.div<{ isVisible?: boolean; darkMode?: boolean }>`
  background: rgba(225, 225, 225, 1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  z-index: 11;
  font-weight: 400;
  border-radius: 22px;
  box-shadow:
    0px 28px 60px -28px rgba(0, 0, 0, 0.6),
    inset 0px 2px 2px -1px rgba(255, 255, 255, 0.6);
  outline: 1px solid rgba(0, 0, 0, 0.25);
  padding: 6px 20px 4px;
  font-family: "Radio Grotesk", "Supply", sans-serif;
  color: #474e59;
  line-height: 130%;
  position: relative;
  transition: bottom 0.2s ease-out;
  bottom: ${({ isVisible }) => (isVisible ? "0" : "-80px")};
`;

const CardBackground = styled.div<{ isVisible?: boolean }>`
  visibility: hidden;
  opacity: 0;
  ${({ isVisible }) => isVisible && "visibility: visible; opacity: 1"};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  height: 100%;
  width: 100%;
  padding: 40px;
  position: absolute;
  font-family: "Cooper Black", serif;
  z-index: 11;
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
  backdrop-filter: blur(28px);
`;

export default FeaturedCard;
