import React, { ForwardedRef } from "react";
import { Select as SelectAntd, SelectProps } from "antd";
import { RefSelectProps } from "antd/lib/select";
import classnames from "classnames";
import styled, { css } from "styled-components";
import Wrapper from "../Field/Wrapper";
import InputLabel from "../InputLabel";
import Text from "../Typography/Text";
import InputHelper from "../Inputs/InputHelper";
const { Option } = SelectAntd;

type data = {
  label: string;
  value: string | number;
};
export type ISelectProps = SelectProps & {
  className?: string;
  label?: string;
  description?: string | React.ReactNode;
  ghost?: boolean;
  defaultValue?: string | number;
  helperText?: string;
  wrapHelperText?: boolean;
  hasError?: boolean;
  inputWrapperClassName?: string;
  labelClassName?: string;
  width?: string;
  value?: string | number;
  requirement?: "required" | "optional";
  tooltipTitle?: string;
  options: data[];
};

export const FancySelect = (props: ISelectProps, ref: ((instance: unknown) => void) | React.RefObject<RefSelectProps> | ForwardedRef<RefSelectProps> | null | undefined) => {
  const {
    className,
    defaultValue,
    hasError,
    helperText,
    label,
    options,
    labelClassName,
    description,
    tooltipTitle,
    value,
    requirement,
    disabled,
    wrapHelperText,
    size = "middle",
    inputWrapperClassName,
  } = props;
  return (
    <StyledInputWrapper className={inputWrapperClassName} hasDescription={Boolean(description)}>
      {label && <InputLabel label={label} labelClassName={labelClassName} requirement={requirement} disabled={disabled} tooltipTitle={tooltipTitle} />}
      {description && (
        <div className="label-description-wrapper">
          <Text className={"description-text"} level={4}>
            {description}
          </Text>
        </div>
      )}
      <StyledFieldWrapper className={classnames("input-wrapper", className)}>
        <StyledSelect value={value} defaultValue={defaultValue ? defaultValue : ""} size={size} ref={ref}>
          {options.map((option) => {
            return (
              <Option value={option.value} key={option.value}>
                {option.label}
              </Option>
            );
          })}
        </StyledSelect>
        {!!helperText && (
          <InputHelper $hasError={hasError} className="input-helper" wrap={wrapHelperText}>
            {helperText}
          </InputHelper>
        )}
      </StyledFieldWrapper>
    </StyledInputWrapper>
  );
};

export const Select = React.forwardRef(FancySelect);

const StyledSelect = styled(SelectAntd)`
${({ disabled, theme }) =>
css`
  border-radius: 4px;
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
    border: 1px solid ${theme.colors["$color-primary-1"]} !important;
    box-shadow: ${theme.shadows.elevationMedium} !important;
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
