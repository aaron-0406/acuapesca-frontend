import React from "react";
import styled, { css } from "styled-components";

type DivProps = React.ComponentProps<"div">;

export type StyledSpacerProps = Omit<DivProps, "ref"> & {
  size: number;
};

export const StyledSpacer = styled.div<StyledSpacerProps>`
  ${({ size }) =>
    css`
      height: ${size}px;
    `}
`;
