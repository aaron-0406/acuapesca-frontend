import React from "react";
import { Tooltip, Button } from "antd";
import classnames from "classnames";
import styled, { css } from "styled-components";
import Text from "../Typography/Text";
import Icon from "../Icon";

export type InputLabelProps = {
  label?: React.ReactNode | string;
  labelClassName?: string;
  tooltipTitle?: string;
  requirement?: "optional" | "required";
  disabled?: boolean;
};

export const InputLabel = ({
  label,
  labelClassName,
  requirement,
  disabled,
  tooltipTitle,
}: InputLabelProps) => {
  return (
    <StyledInputLabelWrapper
      className="input-label-wrapper"
      requirement={requirement}
      disabled={disabled}
    >
      {typeof label === "string" ? (
        <Text
          className={classnames("label", labelClassName)}
          level={3}
          weight="bold"
        >
          {label}
        </Text>
      ) : (
        label
      )}

      {tooltipTitle && (
        <Tooltip title={tooltipTitle}>
          <Button>
            <Icon remixiconClass="ri-information-line" />
          </Button>
        </Tooltip>
      )}

      {requirement === "optional" && (
        <Text className="optional" level={3} weight="regular">
          (optional)
        </Text>
      )}
    </StyledInputLabelWrapper>
  );
};

type StyledInputLabelWrapperProps = {
  requirement?: "optional" | "required";
  disabled?: boolean;
};

const StyledInputLabelWrapper = styled.div<StyledInputLabelWrapperProps>`
  ${({ theme, requirement, disabled }) => css`
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;

    & .ant-typography {
      color: ${theme.colors["$color-transparent-1"]};
      opacity: 1;
    }

    ${requirement === "required" &&
    css`
      &::after {
        display: inline-block;
        margin-left: 4px;
        color: ${theme.colors["$color-error"]};
        font-size: ${theme.text.body.s.fontSize};
        line-height: 22px;
        content: "*";
      }
    `}

    ${disabled &&
    css`
      & .ant-typography {
        color: ${theme.colors["$color-transparent-2"]};
      }
    `}

    span .label {
      margin-bottom: 8px;
    }

    span.optional {
      color: ${theme.colors["$color-transparent-3"]};
      opacity: ${theme.text.opacity.secondary};
      margin-left: 4px;
    }

    .ant-btn {
      padding: 0;
      margin-left: 4px;
      background-color: ${theme.colors["$color-transparent-4"]};
      border: 0;
      height: 22px;
      box-shadow: none;

      &:hover,
      &:focus {
        color: ${theme.colors["$color-primary-2"]};
        background-color: ${theme.colors["$color-transparent-4"]};
      }
    }
  `}
`;
