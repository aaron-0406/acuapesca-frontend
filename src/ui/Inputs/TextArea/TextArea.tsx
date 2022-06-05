import React, { ForwardedRef } from "react";
import styled, { css } from "styled-components";
import { Input } from "antd";
import classnames from "classnames";
import { TextAreaProps } from "antd/lib/input";
import Wrapper from "../../Field/Wrapper";
import InputLabel from "../../InputLabel";
import Text from "../../Typography/Text";
import InputHelper from "../InputHelper";
import { TextAreaRef } from "antd/lib/input/TextArea";
import { InputProps as SimpleInputProps } from "../SimpleInput/SimpleInput";

const { TextArea: AntTextArea } = Input;

export type ITextAreaProps = TextAreaProps &
  SimpleInputProps & {
    className?: string;
    label?: string;
    description?: string | React.ReactNode;
    ghost?: boolean;
    helperText?: string;
    wrapHelperText?: boolean;
    hasError?: boolean;
    inputWrapperClassName?: string;
  };

const FancyTextArea = (
  props: ITextAreaProps,
  ref:
    | ((instance: unknown) => void)
    | React.RefObject<TextAreaRef>
    | ForwardedRef<TextAreaRef>
    | null
    | undefined
) => {
  const {
    className,
    requirement,
    hasError,
    helperText,
    searchIcon,
    clearIcon,
    label,
    labelClassName,
    description,
    tooltipTitle,
    disabled,
    loading,
    width,
    wrapHelperText,
    size = "middle",
    inputWrapperClassName,
    ...rest
  } = props;

  return (
    <StyledInputWrapper
      className={inputWrapperClassName}
      hasDescription={Boolean(description)}
    >
      {label && (
        <InputLabel
          label={label}
          labelClassName={labelClassName}
          requirement={requirement}
          disabled={disabled}
          tooltipTitle={tooltipTitle}
        />
      )}
      {description && (
        <div className="label-description-wrapper">
          <Text className={"description-text"} level={4}>
            {description}
          </Text>
        </div>
      )}
      <StyledFieldWrapper className={classnames("input-wrapper", className)}>
        <StyledTextArea ref={ref} {...rest} />
        {!!helperText && (
          <InputHelper
            $hasError={hasError}
            className="input-helper"
            wrap={wrapHelperText}
          >
            {helperText}
          </InputHelper>
        )}
      </StyledFieldWrapper>
    </StyledInputWrapper>
  );
};

export const TextArea = React.forwardRef(FancyTextArea);

/* export const TextArea = (props: TextAreaProps) => {
  return <StyledTextArea {...props} />;
}; */

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

interface IStyledInputWrapper {
  hasDescription?: boolean;
}

const StyledFieldWrapper = styled(Wrapper)`
  &.input-wrapper {
    display: block;
    position: relative;
  }
`;

const StyledInputWrapper = styled(Wrapper)<IStyledInputWrapper>`
  .label-description-wrapper {
    margin-bottom: 8px;
  }

  .input-label-wrapper {
    margin-bottom: ${({ hasDescription }) => (hasDescription ? "0px" : "8px")};
  }
`;
