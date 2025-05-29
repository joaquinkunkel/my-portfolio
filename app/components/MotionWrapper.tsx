import React from "react";
import { motion, Variants } from "framer-motion";

interface MotionWrapperProps {
  children?: React.ReactNode;
  variants?: Variants;
  className?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  variants = fadeInUp,
  className,
  style,
  fullWidth = false,
}) => {
  const computedStyle = fullWidth ? { ...style, width: "100%" } : style;
  
  return (
    <motion.div variants={variants} className={className} style={computedStyle}>
      {children}
    </motion.div>
  );
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default React.memo(MotionWrapper);
