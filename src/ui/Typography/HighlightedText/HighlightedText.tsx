import React from "react";
import styled, { css, IBaseThemeColors } from "styled-components";
import CSS from "csstype";
import { TextWeightType } from "../../styles/global/types";
import { getTextFont, getTextSizes } from "../Text";

type SpanProps = React.ComponentProps<"span">;

type HighlightedTextProps = Omit<SpanProps, "ref"> & {
  weight?: TextWeightType;
  level?: number;
  cursor?: CSS.Property.Cursor;
  color?: keyof IBaseThemeColors;
};

export const HighlightedText = (props: HighlightedTextProps) => {
  return <StyledHighlightedText {...props} />;
};

const StyledHighlightedText = styled.span<HighlightedTextProps>`
  ${({ theme, weight, level, color = "$color-primary-1" }) =>
    css`
      color: ${theme.colors[color]};
      line-height: 20px !important;
      ${getTextFont(weight)}
      ${getTextSizes(level, weight)}
    `}

  ${({ cursor }) =>
    cursor &&
    css`
      &:hover {
        cursor: ${cursor};
      }
    `}
`;
