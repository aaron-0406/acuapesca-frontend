import React from "react";
import { Button as ButtonAntd, ButtonProps } from "antd";
import styled, { css } from "styled-components";
import { LinkProps } from "react-router-dom";
import ButtonGroup from "antd/lib/button/button-group";

export type StyledLinkProps = {
  linkProps: LinkProps;
  buttonProps?: ButtonProps;
};

export interface IStyledButton extends Omit<ButtonProps, "type" | "shape"> {
  weight?: "regular" | "bold";
  type?: "primary" | "secondary" | "link";
  size?: "small" | "middle" | "large";
  $width?: string;
  shape?: "square" | "round";
  $tight?: boolean;
}

interface IStyledButtonComponents
  extends React.ForwardRefExoticComponent<
    IStyledButton & React.RefAttributes<HTMLElement>
  > {
  Group: typeof ButtonGroup;
  __ANT_BUTTON: boolean;
}

const ButtonDesign = ButtonAntd as IStyledButtonComponents;

const getButtonHeight = (size?: "small" | "middle" | "large") => {
  switch (size) {
    case "small":
      return "28px";
    case "large":
      return "40px";
    default:
      return "32px";
  }
};

// TODO: POR-225 - font size refactor
const getButtonSizes = (size?: "small" | "middle" | "large") => {
  switch (size) {
    case "small":
      return css`
        ${({ theme }) =>
          css`
            font-size: ${theme.text.body.s.fontSize}px !important;
            letter-spacing: ${theme.text.body.s.letterSpacing}px;
          `};
      `;
    case "large":
      return css`
        ${({ theme }) =>
          css`
            font-size: ${theme.text.body.l.fontSize}px !important;
            letter-spacing: ${theme.text.body.l.letterSpacing}px;
          `};
      `;
    default:
      return css`
        ${({ theme }) =>
          css`
            font-size: ${theme.text.body.m.fontSize}px !important;
            letter-spacing: ${theme.text.body.m.letterSpacing}px;
          `};
      `;
  }
};

const getFontFamily = (weight?: "regular" | "bold") => {
  switch (weight) {
    case "bold":
      return css`
        ${({ theme }) => theme.text.fonts.mavenProBold};
      `;
    default:
      return css`
        ${({ theme }) => theme.text.fonts.mavenProRegular};
      `;
  }
};

export const StyledButton = styled(ButtonDesign)<IStyledButton>`
  ${({ theme, size, weight, $width, $tight }) =>
    css`
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      padding: ${!!$tight ? "4px" : "4px 16px "} !important;
      font-family: ${getFontFamily(weight)};
      ${getButtonSizes(size)}
      height: ${getButtonHeight(size)};
      width: ${$width || "auto"};
      box-sizing: border-box;

      &[ant-click-animating-without-extra-node="true"]::after,
      &.ant-click-animating-node {
        box-shadow: 0px 0px 3px 5px ${theme.colors["$color-primary-1"]} !important;
      }

      & span {
        display: flex;
        flex-direction: row;
        gap: 8px;
        text-overflow: ellipsis;
      }

      & .anticon {
        vertical-align: middle;
        display: flex;
      }

      &.ant-btn-dangerous.ant-btn-primary {
        background: ${theme.colors["$color-danger-4"]};
        color: ${theme.colors["$color-neutral-1"]};
      }

      &.ant-btn-dangerous.ant-btn-primary:hover {
        background: ${theme.colors["$color-danger-3"]};
        color: ${theme.colors["$color-neutral-1"]};
      }

      &.ant-btn-dangerous.ant-btn-primary[disabled] {
        background: ${theme.colors["$color-neutral-3"]};
        color: ${theme.colors["$color-neutral-5"]};
      }

      &.ant-btn-dangerous[disabled] {
        color: ${theme.colors["$color-neutral-5"]};
      }
    `}
  ${({ theme, type = "primary", danger }) =>
    type === "primary" && !danger
      ? css`
          background: ${theme.colors["$color-primary-1"]};
          border: none;
          color: ${theme.colors["$color-neutral-1"]};

          &:hover,
          &:active:hover,
          &:focus:hover {
            background: ${theme.colors["$color-primary-1"]};
            color: ${theme.colors["$color-neutral-1"]};
            border: none;
          }

          &:focus,
          &:active {
            background: ${theme.colors["$color-primary-1"]};
            color: ${theme.colors["$color-neutral-1"]};
            border: none;
          }

          &.ant-btn-primary[disabled] {
            background: ${theme.colors["$color-neutral-3"]};
            color: ${theme.colors["$color-neutral-5"]};
            border: none;
          }
        `
      : type === "primary" && danger
      ? css`
          background: ${theme.colors["$color-danger-4"]};
          border: none;
          color: ${theme.colors["$color-neutral-1"]};

          &:hover,
          &:active:hover,
          &:focus:hover {
            background: ${theme.colors["$color-danger-3"]};
            color: ${theme.colors["$color-neutral-1"]};
            border: none;
          }

          &:focus,
          &:active {
            background: ${theme.colors["$color-danger-3"]};
            color: ${theme.colors["$color-neutral-1"]};
            border: none;
          }

          &.ant-btn-primary[disabled] {
            background: ${theme.colors["$color-neutral-3"]};
            color: ${theme.colors["$color-neutral-5"]};
            border: none;
          }
        `
      : type === "secondary" && !danger
      ? css`
          color: ${theme.colors["$color-primary-1"]};
          background: none;
          border-color: ${theme.colors["$color-primary-1"]};

          &:active:not(:hover),
          &:focus:not(:hover) {
            background: none;
            border-color: ${theme.colors["$color-primary-1"]};
            color: ${theme.colors["$color-primary-1"]};
          }

          &:hover,
          &:active:hover,
          &:focus:hover {
            background: none;
            border-color: ${theme.colors["$color-primary-1"]};
            color: ${theme.colors["$color-primary-1"]};
          }

          &.ant-btn[disabled] {
            background: none;
            color: ${theme.colors["$color-neutral-5"]};
            border-color: ${theme.colors["$color-neutral-5"]};
          }
        `
      : type === "secondary" && danger
      ? css`
          &.ant-btn[disabled] {
            background: none;
          }
        `
      : type === "link" && danger
      ? css`
          &.ant-btn-dangerous[disabled]:hover {
            background: none;
            color: ${theme.colors["$color-neutral-5"]};
          }
        `
      : type === "link" &&
        css`
          color: ${theme.colors["$color-primary-1"]};

          &:active:not(:hover),
          &:focus:not(:hover) {
            color: ${theme.colors["$color-primary-1"]};
          }

          &:hover,
          &:active:hover,
          &:focus:hover {
            color: ${theme.colors["$color-primary-1"]};
          }

          &.ant-btn-link[disabled] {
            color: ${theme.colors["$color-neutral-5"]};
          }
        `}
  ${({ shape }) =>
    shape === "round" &&
    css`
      &.ant-btn-round {
        border-radius: ${({ theme }) => theme.spacing.cornerRadiusSmall};
      }
    `}
`;
