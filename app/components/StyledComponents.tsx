import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import Lightbulb from "../../public/icons/bulb.svg";

export const featuredBoxShadow =
  "0 6px 10px rgba(0, 0, 0, 0.06), 0 1.5px 4px rgba(0, 0, 0, 0.05)";

export const PageContainer = styled.div<{ darkmode: boolean }>`
  height: 100svh;
  width: 100vw;
  position: relative;
  background: ${({ darkmode }) => (darkmode ? "#0c0e14" : "#fcfdff")};
  animation: gradientAnimation 120s ease infinite;
  background-size: 500% 500%;
  transition: all 0.3s ease-out;
`;

export const DarkModeToggleLink = styled.a<{ isMobile: boolean }>`
  position: absolute;
  z-index: 10;
  bottom: ${(props) => (props.isMobile ? "40px" : "75px")};
  left: ${(props) => (props.isMobile ? "20px" : "60px")};
`;

export const DarkModeToggleIcon = styled(Lightbulb)<{ darkmode: boolean }>`
  width: 32px;
  height: 32px;
  filter: ${(props) => (props.darkmode ? "invert()" : "none")};
  stroke-width: 9;
  stroke: black;
`;

export const ContactLink = styled.a<{ darkmode: boolean; isMobile: boolean }>`
  position: absolute;
  z-index: 10;
  top: ${(props) => (props.isMobile ? "20px" : "75px")};
  right: ${(props) => (props.isMobile ? "20px" : "60px")};
  padding: 2px 10px;
  background: ${(props) => (props.darkmode ? "white" : "#303a49")};
  color: ${(props) => (props.darkmode ? "#383842" : "#eeeeee")};
  border-radius: 20px;
  font-family:
    Cooper Black,
    Supply,
    Radio Grotesk,
    sans-serif,
    monospace,
    sans-serif;
`;

export const GitHubLink = styled.a<{ isMobile: boolean }>`
  position: absolute;
  z-index: 10;
  bottom: ${({ isMobile }) => (isMobile ? "40px" : "75px")};
  right: ${({ isMobile }) => (isMobile ? "20px" : "60px")};
  font-size: 14px;
  font-family:
    Radio Grotesk,
    sans-serif,
    monospace;
`;

// New Badge Card Styling
export const BadgeCard = styled.div`
  padding: 4px 16px 24px;
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
export const QuoteType = styled.p<{ larger?: boolean }>`
  ::first-letter {
    font-size: 250%;
    color: green; // Customize as you like
    font-weight: bold; // Optional, for emphasis
    float: left; // Ensures the drop cap "floats" to the left
    margin-right: 0.1em; // Adjust spacing
    line-height: 1; // Adjust line height to align properly
  }
  line-height: 1.5;
  ${({ larger }) =>
    larger &&
    css`
      font-size: 1.1em;
      line-height: 1.3;
    `}
`;

export const HighlightSpan = styled.span``;

export const CardHeader = styled.div<{ darkmode?: boolean }>`
  padding: 8px 24px 2px;
  margin: 0 -20px 16px;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
  background: ${({ darkmode }) =>
    darkmode ? "rgba(20, 23, 29, 0.9)" : "rgba(225, 225, 225, 0.9)"};
  outline: 1px solid rgba(0, 0, 0, 0.05);
`;

export const Row = styled.div<{
  noWrap?: boolean;
  noPadding?: boolean;
  extraPadding?: boolean;
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
  ${({ extraPadding }) => extraPadding && "padding: 42px 0 0; margin: 0;"}
  ${({ spaceBetween }) =>
    spaceBetween && "gap: space-between; align-items: center;"}
`;

export const FeaturedHeading = styled.h1`
  font-family:
    Radio Grotesk,
    Cooper Black,
    Radio Grotesk;
  font-size: 28px;
  font-weight: 700;
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

export const Section = styled.div<{ noPadding?: boolean }>`
  background: rgba(255, 255, 255, 0.4);
  padding: ${({ noPadding }) => (noPadding ? "0" : "14px 16px 14px")};
  font-size: 14px;
  border-radius: 10px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  outline: 1px solid rgba(0, 0, 0, 0.05);
  width: 100%;
  letter-spacing: 0.02em;
`;

export const GridList = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-auto-rows: auto;
  row-gap: 8px;
`;
export const Map = styled.img`
  /* filter: grayscale(1); */
  width: 100%;
  height: auto;
  mix-blend-mode: multiply;
`;

export const MapContainer = styled.div`
  background: white;
  height: 100px;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  margin: 0 0 12px;
  outline: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: ${featuredBoxShadow};
`;

export const StyledGraph = styled.div`
  background: linear-gradient(
    135deg,
    rgba(245, 243, 236, 0.85),
    /* soft peach */ rgba(246, 245, 221, 0.75) /* light mint green */
  );
  border-radius: 6px;
  width: 100%;
  margin: 0 0 12px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  outline: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: ${featuredBoxShadow};
  height: 100px;
  overflow: hidden;
`;

export const captionStyle = {
  fontSize: "0.85em",
  opacity: 0.75,
  marginTop: 0,
};

export const indented = {
  marginLeft: 22,
};

export const LinksContainer = styled.div<{
  isvisible?: boolean;
  darkmode?: boolean;
}>`
  opacity: 0;
  font-family: "Radio Grotesk", sans-serif, monospace;
  color: ${({ darkmode }) =>
    darkmode ? "rgba(255, 255, 255, 0.76)" : "#282832"};
  transition: ${({ isvisible }) => isvisible && "0.2s all ease-out"};
  opacity: ${({ isvisible }) => (isvisible ? "1" : "0")};
`;

export const Weblink = styled.a`
  background: #303a49;
  border-radius: 20px;
  padding: 4px 10px;
  box-shadow:
    0px 2px 2px -2px rgba(255, 255, 255, 0.1),
    inset 0px 1px 5px -2px rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 400;
  font-family:
    Radio Grotesk,
    Cooper Black,
    sans-serif;
  font-size: 0.8em;
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
  margin-bottom: -4px;
  grid-column: 1 / -1;
`;

export const StyledVideo = styled.video<{ isReady?: boolean }>`
  min-height: 100px;
  border-radius: 8px;
  outline: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: ${featuredBoxShadow};
  @media (max-width: 600px) {
    max-width: 100%;
  }
  display: ${(isReady) => (isReady ? "block" : "none")};
  transition: all 0.2s;
`;

export const StyledGIF = styled.img<{ isReady?: boolean }>`
  min-height: 100px;
  border-radius: 8px;
  outline: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: ${featuredBoxShadow};
  @media (max-width: 600px) {
    max-width: 100%;
  }
  display: ${(isReady) => (isReady ? "block" : "none")};
  transition: all 0.2s;
`;

export const VideoPlaceholder = styled.div<{ isMobile?: boolean }>`
  width: 230px;
  height: 160px;
  border-radius: 8px;
  background: #e0e0e0;
  ${({ isMobile }) =>
    isMobile &&
    css`
      height: 80px;
    `}
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-top: 4px;
  opacity: 0.65;
`;

export const VimeoContainer = styled.div`
  padding: 56.25% 0 0 0;
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  outline: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: ${featuredBoxShadow};
`;

export const VimeoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

export const VideoLoadingOverlay = styled.div<{ isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: ${(props) => (props.isLoading ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: opacity 0.3s ease-out;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
