import React, { RefObject } from "react";
import { TextProps as AntTextProps } from "antd/lib/typography/Text";
import styled, { css, IBaseThemeColors } from "styled-components";
import { Typography } from "antd";
import { BaseType } from "antd/lib/typography/Base";
import { TextAlignType, TextWeightType } from "../../styles/global/types";

export interface TypographyTextProps extends AntTextProps {
  weight?: TextWeightType;
  level?: number;
  textAlign?: TextAlignType;
  color?: keyof IBaseThemeColors;
}

export const Text = React.forwardRef(
  (
    { textAlign = "left", ...props }: TypographyTextProps,
    ref:
      | ((instance: HTMLParagraphElement | null) => void)
      | RefObject<HTMLParagraphElement>
      | null
      | undefined
  ) => {
    return (
      <div ref={ref}>
        <StyledText $textAlign={textAlign} {...props} />
      </div>
    );
  }
);

export const getTextFont = (weight?: TextWeightType) => {
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

export const getTextSizes = (level?: number, weight?: TextWeightType) => {
  switch (level) {
    case 2:
      return css`
        ${weight === "bold"
          ? css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.bodyBold.l.fontSize}px;
                  font-weight: ${theme.text.bodyBold.l.fontWeight};
                  line-height: ${theme.text.bodyBold.l.lineHeight}px;
                  letter-spacing: ${theme.text.bodyBold.l.letterSpacing}px;
                `}
            `
          : css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.body.l.fontSize}px;
                  font-weight: ${theme.text.body.l.fontWeight};
                  line-height: ${theme.text.body.l.lineHeight}px;
                  letter-spacing: ${theme.text.body.l.letterSpacing}px;
                `}
            `}
      `;

    case 3:
      return css`
        ${weight === "bold"
          ? css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.bodyBold.m.fontSize}px;
                  font-weight: ${theme.text.bodyBold.m.fontWeight};
                  line-height: ${theme.text.bodyBold.m.lineHeight}px;
                  letter-spacing: ${theme.text.bodyBold.m.letterSpacing}px;
                `}
            `
          : css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.body.m.fontSize}px;
                  font-weight: ${theme.text.body.m.fontWeight};
                  line-height: ${theme.text.body.m.lineHeight}px;
                  letter-spacing: ${theme.text.body.m.letterSpacing}px;
                `}
            `}
      `;

    case 4:
      return css`
        ${weight === "bold"
          ? css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.bodyBold.s.fontSize}px;
                  font-weight: ${theme.text.bodyBold.s.fontWeight};
                  line-height: ${theme.text.bodyBold.s.lineHeight}px;
                  letter-spacing: ${theme.text.bodyBold.s.letterSpacing}px;
                `}
            `
          : css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.body.s.fontSize}px;
                  font-weight: ${theme.text.body.s.fontWeight};
                  line-height: ${theme.text.body.s.lineHeight}px;
                  letter-spacing: ${theme.text.body.s.letterSpacing}px;
                `}
            `}
      `;

    default:
      return css`
        ${weight === "bold"
          ? css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.bodyBold.xl.fontSize}px;
                  font-weight: ${theme.text.bodyBold.xl.fontWeight};
                  line-height: ${theme.text.bodyBold.xl.lineHeight}px;
                  letter-spacing: ${theme.text.bodyBold.xl.letterSpacing}px;
                `}
            `
          : css`
              ${({ theme }) =>
                css`
                  font-size: ${theme.text.body.xl.fontSize}px;
                  font-weight: ${theme.text.body.xl.fontWeight};
                  line-height: ${theme.text.body.xl.lineHeight}px;
                  letter-spacing: ${theme.text.body.xl.letterSpacing}px;
                `}
            `}
      `;
  }
};

const getTextTypes = (type?: BaseType) => {
  switch (type) {
    case "success":
      return css`
        color: ${({ theme }) => theme.colors["$color-success"]};
      `;

    case "danger":
      return css`
        color: ${({ theme }) => theme.colors["$color-error"]};
      `;

    case "warning":
      return css`
        color: ${({ theme }) => theme.colors["$color-warning"]};
      `;

    case "secondary":
      return css`
        color: ${({ theme }) => theme.colors["$color-primary-2"]};
      `;

    default:
      css``;
  }
};

type StyledTextProps = AntTextProps & {
  weight?: TextWeightType;
  level?: number;
  $textAlign?: TextAlignType;
  type?: BaseType;
  color?: keyof IBaseThemeColors;
};

export const StyledText = styled(Typography.Text)<StyledTextProps>`
  display: block;
  width: 100%;
  ${({ $textAlign }) =>
    css`
      text-align: ${$textAlign};
    `}

  &.ant-typography {
    ${({ weight }) => getTextFont(weight)}
    ${({ level, weight }) => getTextSizes(level, weight)}
    ${({ type }) => getTextTypes(type)}

    ${({ color, theme }) =>
      !!color &&
      css`
        color: ${theme.colors[`${color}`]};
      `}
  }
`;
