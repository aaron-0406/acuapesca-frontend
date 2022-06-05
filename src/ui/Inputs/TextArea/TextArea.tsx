import React from "react";
import styled, { css } from "styled-components";
import { Input } from "antd";
import { TextAreaProps } from "antd/lib/input";

const { TextArea: AntTextArea } = Input;

export const TextArea = (props: TextAreaProps) => {
  return <StyledTextArea {...props} />;
};

const StyledTextArea = styled(AntTextArea)`
  ${({ disabled, theme }) =>
    css`
      border-radius: 4px;
      padding: 16px 24px 24px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: left;
      align-items: center;
      background-color: ${theme.colors["$color-neutral-1"]};
      border: 1px solid ${theme.colors["$color-neutral-4"]};

      ${disabled &&
      css`
        background-color: ${theme.colors["$color-transparent-light-95"]};
        border: 1px solid ${theme.colors["$color-neutral-5"]};
        color: ${theme.colors["$color-transparent-dark-25"]};
      `}

      &::placeholder {
        color: ${theme.colors["$color-neutral-6"]};
      }

      &:hover,
      &:focus {
        border: 1px solid ${theme.colors["$color-primary-1"]};
        box-shadow: ${theme.shadows.elevationMedium};
      }
    `}
`;
