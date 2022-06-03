import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import InputLabel from "../../InputLabel";
import InputHelper from "../InputHelper";
import Wrapper from "../../Field/Wrapper";
import Text from "../../Typography/Text";
import {
  InputProps as SimpleInputProps,
  SimpleInput,
} from "../SimpleInput/SimpleInput";

export type InputProps = SimpleInputProps & {
  className?: string;
  label?: string;
  description?: string | React.ReactNode;
  ghost?: boolean;
  helperText?: string;
  wrapHelperText?: boolean;
  hasError?: boolean;
  inputWrapperClassName?: string;
};

const FancyInput = (
  props: InputProps,
  ref:
    | ((instance: unknown) => void)
    | React.RefObject<unknown>
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
        <SimpleInput
          hasError={hasError}
          disabled={disabled}
          searchIcon={searchIcon}
          clearIcon={clearIcon}
          loading={loading}
          size={size}
          ref={ref}
          width={width}
          {...rest}
        />
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

export const Input = React.forwardRef(FancyInput);

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
