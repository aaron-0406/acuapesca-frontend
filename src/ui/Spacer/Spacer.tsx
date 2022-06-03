import React from "react";
import { StyledSpacer, StyledSpacerProps } from "./Spacer.styled";

export const Spacer: React.FC<StyledSpacerProps> = (props) => {
  return <StyledSpacer {...props} />;
};
