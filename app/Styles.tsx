import styled from "styled-components";

export const featuredBoxShadow =
  "0 6px 10px rgba(0, 0, 0, 0.06), 0 1.5px 4px rgba(0, 0, 0, 0.05)";

// New Badge Card Styling
export const BadgeCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ProductHuntBadge = styled.img`
  width: 190px;
  margin-top: 0;
  filter: grayscale(1);
  opacity: 1;
  &:hover {
    filter: none;
  }
`;
export const QuoteType = styled.p`
  ::first-letter {
    font-size: 250%;
    color: green; // Customize as you like
    font-weight: bold; // Optional, for emphasis
    float: left; // Ensures the drop cap "floats" to the left
    margin-right: 0.1em; // Adjust spacing
    line-height: 1; // Adjust line height to align properly
  }
`;

export const HighlightSpan = styled.span`
  // color: #cc2f90;
  font-weight: 700;
`;

export const Row = styled.div<{
  noWrap?: boolean;
  noPadding?: boolean;
  spaceBetween?: boolean;
}>`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 20px 0;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: wrap;
    gap: 16px;
    ${({ noWrap }) => noWrap && "flex-direction: row;"}
  }

  ${({ noPadding }) => noPadding && "padding: 0; margin: 0;"}
  ${({ spaceBetween }) =>
    spaceBetween && "gap: space-between; align-items: center;"}
`;

export const FeaturedHeading = styled.h1`
  font-family:
    Cooper Black,
    Radio Grotesk;
  font-size: 26px;
  font-weight: normal;
`;


export const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4194,37.7749,12/600x300?access_token=pk.eyJ1Ijoiam9hcXVpbmt1bmtlbCIsImEiOiJjbTBraHNzajMxN2IwMm1xMnA1NHBqMDY3In0.QoxI3AJs0BryBFMJXh_jXQ`;

export const svgGraph = (
  <svg style={{ opacity: 0.9 }} width="100%" viewBox="0 0 100 50">
    <defs>
      {/* Gradient for the shaded area */}
      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(135, 206, 250, 0.5)" />{" "}
        {/* Light sky blue */}
        <stop offset="100%" stopColor="rgba(0, 255, 127, 0)" />{" "}
        {/* Soft green */}
      </linearGradient>
    </defs>

    {/* Shaded area under the line representing exponential growth */}
    <polygon
      fill="url(#lineGradient)"
      points="0,50 10,48 20,45 30,42 40,38 50,32 60,28 70,20 80,15 90,10 100,5 100,50 0,50"
    />

    {/* Line representing exponential growth */}
    <polyline
      fill="none"
      stroke="rgba(0, 0, 0, 0.4)"
      strokeWidth="1.5"
      points="0,50 10,48 20,45 30,42 40,38 50,32 60,28 70,20 80,15 90,10 100,5"
    />
  </svg>
);

export const sectionStyle = {
  background: "rgba(255, 255, 255, 0.4)",
  padding: "4px 22px 18px",
  fontSize: 16,
  borderRadius: 12,
  display: "flex",
  alignItems: "baseline",
  flexDirection: "column" as "column",
  outline: "1px solid rgba(0, 0, 0, 0.05)",
  width: "100%",
  letterSpacing: ".02em",
};

export const iconStyle={
marginRight: 16,
margiTop: 8,
opacity: 0.65
}

export const liStyle = {
  width: "100%",
  listStyleType: 'none',
};

export const mapStyle = {
  // filter: "grayscale(1)",
  width: "100%",
  height: "auto",
  mixBlendMode: "multiply" as "multiply",
};
export const mapContainerStyle = {
  background: "white",
  height: 100,
  borderRadius: 6,
  overflow: "hidden",
  width: "100%",
  margin: "16px 0 12px",
  outline: "1px solid rgba(0,0,0,0.05)",
  boxShadow: featuredBoxShadow,
};
export const graphStyle = {
  background: `linear-gradient(135deg, 
    rgba(245, 243, 236, 0.85),  /* soft peach */
    rgba(246, 245, 221, 0.75)   /* light mint green */
  )`,
  borderRadius: 6,
  width: "100%",
  margin: "16px 0 12px",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  outline: "1px solid rgba(0,0,0,0.05)",
  boxShadow: featuredBoxShadow,
  height: 100,
  overflow: "hidden",
};


export const captionStyle = {
  fontSize: "0.85em",
  opacity: 0.75,
  marginTop: 0,
};

export const indented = {
  marginLeft: 22,
};

export const LinksContainer = styled.div<{ visible: boolean; isDarkMode?: boolean }>`
  opacity: 0;
  font-family: "Radio Grotesk", sans-serif, monospace;
  color: ${({ isDarkMode }) =>
    isDarkMode ? "rgba(255, 255, 255, 0.7)" : "#383842"};
  transition: ${({ visible }) => visible && "0.2s all ease-out"};
  opacity: ${({ visible }) => (visible ? "1" : "0")};
`;

export const Weblink = styled.a`
  background: #474e59;
  border-radius: 10px;
  padding: 4px 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  color: white;
  text-decoration: none;
  font-family:
    Cooper Black,
    Radio Grotesk,
    sans-serif;
  font-size: 0.9em;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-out;
  opacity: 1;
  &:hover {
    background: #171e29;
  }
`;

export const Caption = styled.p`
  font-size: 0.85em;
  opacity: 0.75;
  margin-top: 4px;
`;

export const StyledVideo = styled.video`
  max-width: 230px;
  min-height: 100px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin-left: 8px;
  @media (max-width: 600px) {
    margin: 8px auto;
    max-width: 100%;
  }
  // box-shadow: -4px 10px 32px rgba(0, 0, 0, 0.2);
  filter: brightness(0.72);
  transition: all 0.2s;
`;