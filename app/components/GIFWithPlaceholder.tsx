import React from "react";
import { StyledGIF } from "./StyledComponents";

interface GIFWithPlaceholderProps {
    src: string;
}

const GIFWithPlaceholder: React.FC<GIFWithPlaceholderProps> = (({ src }) => {
  return (
    <div>
      <StyledGIF src={src} />
    </div>
  );
});

export default React.memo(GIFWithPlaceholder);