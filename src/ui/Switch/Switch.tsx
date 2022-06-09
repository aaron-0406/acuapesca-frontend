import React from "react";
import { Switch as AntdSwitch, SwitchProps as AntSwitchProps } from "antd";
import styled, { css, IBaseThemeColors } from "styled-components";

type SwitchProps = AntSwitchProps & {
  checkedColor?: keyof IBaseThemeColors;
  unCheckedColor?: keyof IBaseThemeColors;
};

export const Switch: React.FC<SwitchProps> = ({
  checkedColor = "$color-primary-1",
  unCheckedColor = "$color-neutral-5",
  ...props
}) => {
  return (
    <StyledSwitch
      {...props}
      $checkedColor={checkedColor}
      $unCheckedColor={unCheckedColor}
    />
  );
};

type StyledSwitchProps = {
  $checkedColor: keyof IBaseThemeColors;
  $unCheckedColor: keyof IBaseThemeColors;
};

const StyledSwitch = styled(AntdSwitch)<StyledSwitchProps>`
  &.ant-switch {
    ${({ theme, $unCheckedColor }) => css`
      background-color: ${theme.colors[`${$unCheckedColor}`]};
      height: 24px;
    `}
  }

  & .ant-switch-handle {
    top: 3px;
  }

  & .ant-switch-handle .anticon-loading {
    top: -6px;
  }

  & .ant-switch-loading-icon {
    ${({ theme, $unCheckedColor }) => css`
      color: ${theme.colors[`${$unCheckedColor}`]};
    `}
  }

  &.ant-switch-checked .ant-switch-loading-icon {
    ${({ theme, $checkedColor }) => css`
      color: ${theme.colors[`${$checkedColor}`]};
    `}
  }

  & .ant-switch-inner .anticon {
    vertical-align: -0.125em;
  }

  &.ant-switch-checked {
    ${({ theme, $checkedColor }) => css`
      background-color: ${theme.colors[`${$checkedColor}`]};
    `}
  }

  &.ant-switch-small {
    height: 16px;
  }

  &.ant-switch-small .ant-switch-handle {
    top: 2px;
  }

  &.ant-switch-small .ant-switch-loading-icon {
    font-size: 10px;
  }

  & .ant-switch-handle .anticon-loading {
    top: -5px;
  }
`;
