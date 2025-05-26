import React, { ReactElement } from "react";
import { StyledFontAwesomeIcon } from "./Styles";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CVListItemProps {
  icon?: IconProp;
  children?: ReactElement | string;
}

const CVListItem: React.FC<CVListItemProps> = ({ icon, children }) => {
  return (
    <>
      {icon && <StyledFontAwesomeIcon icon={icon} />}
      <p>{!icon && '• '}{children}</p>
    </>
  );
};

export default React.memo(CVListItem);
