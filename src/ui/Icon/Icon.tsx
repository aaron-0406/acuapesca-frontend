import React from "react";
import styled, { css, IBaseThemeColors } from "styled-components";
import CSS from "csstype";
import classnames from "classnames";
import get from "lodash/get";

export type IconProps = {
  remixiconClass: string;
  size?: number;
  color?: keyof IBaseThemeColors;
  classes?: string;
  onClick?: () => void;
  cursor?: CSS.Property.Cursor;
  alignSelf?: CSS.Property.AlignSelf;
  verticalAlign?: CSS.Property.VerticalAlign;
  spinning?: boolean;
};

export const Icon = ({
  remixiconClass,
  classes,
  spinning,
  ...props
}: IconProps) => {
  return (
    <StyledIcon
      {...props}
      className={classnames("anticon", classes)}
      role="anticon"
    >
      <i
        className={classnames({ spinning }, remixiconClass)}
        role={remixiconClass}
      />
    </StyledIcon>
  );
};

Icon.defaultProps = {
  size: 20,
};

type StyledIconProps = Omit<IconProps, "remixiconClass">;

const StyledIcon = styled.div<StyledIconProps>`
  ${({ cursor }) =>
    cursor &&
    css`
      &:hover {
        cursor: ${cursor};
      }
    `}

  ${({ alignSelf }) =>
    alignSelf &&
    css`
      align-self: ${alignSelf};
    `}


  ${({ verticalAlign }) =>
    verticalAlign &&
    css`
      vertical-align: ${verticalAlign};
    `}

  ${({ size }) =>
    css`
      width: ${size}px;
      height: ${size}px;
    `}

  i {
    ${({ size }) =>
      css`
        font-size: ${size}px;
      `}

    ${({ color, theme }) =>
      color &&
      css`
        color: ${get(theme, `colors['${color}']`)};
      `}
  }
`;
