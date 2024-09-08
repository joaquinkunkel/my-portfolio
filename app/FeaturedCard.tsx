import styled, { css } from "styled-components";

type IFeaturedCardProps = {
    onBackgroundClick: () => void;
    isDarkMode: boolean | undefined;
    children: React.ReactNode;
    visible?: boolean;
};

const FeaturedCard: React.FC<IFeaturedCardProps> = ({ onBackgroundClick, isDarkMode, children, visible }) => {
    return (
        <CardBackground onClick={(e) => { onBackgroundClick(); e.stopPropagation(); }} visible={visible}>
            <Card visible={visible} onClick={ (e) => {e.stopPropagation(); }}>
                {children}
            </Card>
        </CardBackground>
    );
};

const Card = styled.div<{ visible?: boolean }>`
  background: rgba(245, 245, 245, 0.8);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  z-index: 11;
  border-radius: 22px;
  box-shadow: 
    0px 28px 60px -28px rgba(0, 0, 0, 0.4), 
    inset 0px 2px 2px -1px rgba(255, 255, 255, 0.4), 
    inset 0px -32px 6px -32px rgba(0, 0, 0, 0.1);
  outline: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  padding: 14px 24px;
  font-family: 'Supply', sans-serif;
  color: #383842;
  line-height: 130%;
  position: relative;
  transition: bottom 0.2s ease-out;
  bottom: ${({visible}) => (visible ? '0' : '-20px')};
`;

const CardBackground = styled.div<{ visible?: boolean }>`
  visibility: hidden;
  opacity: 0;
  ${({ visible }) => (visible && 'visibility: visible; opacity: 1')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  height: 100%;
  width: 100%;
  padding: 40px;
  position: absolute;
  font-family: 'Cooper Black', serif;
  z-index: 11;
  background: rgba(0, 0, 0, 0.5);
  overflow: auto;
  transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
`;

export default FeaturedCard;
