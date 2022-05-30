import React from "react";
import { Typography } from "antd";
import { TitleProps as AntTitleProps } from "antd/lib/typography/Title";
import styled, { css } from "styled-components";
import { TextWeightType } from "../../styles/global/types";

export interface TypographyTitleProps extends AntTitleProps {
  weight?: TextWeightType;
}

export const Title = (props: TypographyTitleProps) => {
  return <StyledTitle {...props} />;
};

const getTitleFont = (weight?: TextWeightType) => {
  switch (weight) {
    case "bold":
      return css`
        ${({ theme }) =>
          css`
            font-family: ${theme.text.fonts.mavenProBold};
          `}
      `;
    default:
      return css`
        ${({ theme }) =>
          css`
            font-family: ${theme.text.fonts.mavenProRegular};
          `}
      `;
  }
};

const getTitleSizes = (level?: number, weight?: TextWeightType) => {
  switch (level) {
    case 2:
      return css`
        ${weight === "bold"
          ? css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.displayBold.l.fontSize}px;
                  font-weight: ${theme.text.displayBold.l.fontWeight};
                  line-height: ${theme.text.displayBold.l.lineHeight}px;
                  letter-spacing: ${theme.text.displayBold.l.letterSpacing}px;
                `}
            `
          : css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.display.l.fontSize}px;
                  font-weight: ${theme.text.display.l.fontWeight};
                  line-height: ${theme.text.display.l.lineHeight}px;
                  letter-spacing: ${theme.text.display.l.letterSpacing}px;
                `}
            `}
      `;

    case 3:
      return css`
        ${weight === "bold"
          ? css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.displayBold.m.fontSize}px;
                  font-weight: ${theme.text.displayBold.m.fontWeight};
                  line-height: ${theme.text.displayBold.m.lineHeight}px;
                  letter-spacing: ${theme.text.displayBold.m.letterSpacing}px;
                `}
            `
          : css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.display.m.fontSize}px;
                  font-weight: ${theme.text.display.m.fontWeight};
                  line-height: ${theme.text.display.m.lineHeight}px;
                  letter-spacing: ${theme.text.display.m.letterSpacing}px;
                `}
            `}
      `;

    case 4:
      return css`
        ${weight === "bold"
          ? css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.displayBold.s.fontSize}px;
                  font-weight: ${theme.text.displayBold.s.fontWeight};
                  line-height: ${theme.text.displayBold.s.lineHeight}px;
                  letter-spacing: ${theme.text.displayBold.s.letterSpacing}px;
                `}
            `
          : css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.display.s.fontSize}px;
                  font-weight: ${theme.text.display.s.fontWeight};
                  line-height: ${theme.text.display.s.lineHeight}px;
                  letter-spacing: ${theme.text.display.s.letterSpacing}px;
                `}
            `}
      `;

    case 5:
      return css`
        ${weight === "bold"
          ? css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.displayBold.xs.fontSize}px;
                  font-weight: ${theme.text.displayBold.xs.fontWeight};
                  line-height: ${theme.text.displayBold.xs.lineHeight}px;
                  letter-spacing: ${theme.text.displayBold.xs.letterSpacing}px;
                `}
            `
          : css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.display.xs.fontSize}px;
                  font-weight: ${theme.text.display.xs.fontWeight};
                  line-height: ${theme.text.display.xs.lineHeight}px;
                  letter-spacing: ${theme.text.display.xs.letterSpacing}px;
                `}
            `}
      `;

    default:
      return css`
        ${weight === "bold"
          ? css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.displayBold.xl.fontSize}px;
                  font-weight: ${theme.text.displayBold.xl.fontWeight};
                  line-height: ${theme.text.displayBold.xl.lineHeight}px;
                  letter-spacing: ${theme.text.displayBold.xl.letterSpacing}px;
                `}
            `
          : css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.display.xl.fontSize}px;
                  font-weight: ${theme.text.display.xl.fontWeight};
                  line-height: ${theme.text.display.xl.lineHeight}px;
                  letter-spacing: ${theme.text.display.xl.letterSpacing}px;
                `}
            `}
      `;
  }
};

export const StyledTitle = styled(Typography.Title)<TypographyTitleProps>`
  ${({ weight, level }) => css`
    &.ant-typography {
      margin: 0 !important;
      ${getTitleFont(weight)}
      ${getTitleSizes(level, weight)}
    }
  `}
`;
