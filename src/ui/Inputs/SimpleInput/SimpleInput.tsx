import React, { useImperativeHandle, useState } from "react";
import styled, { css } from "styled-components";
import {
  InputProps as AntdInputProps,
  Input as AntdInput,
  InputRef as AntdInputRef,
  InputNumberProps,
  Spin,
} from "antd";
import { Property } from "csstype";
import pick from "lodash/pick";
import omit from "lodash/omit";
import Icon from "../../Icon";
import { InputLabelProps } from "../../InputLabel";
import { SizeType } from "../../styles/global/types";
import {
  eventCodeArrow,
  eventCodeKey,
  eventKeyOnlyLetters,
  leadingAndTrailingSpaces,
  multipleSpacesToOneSpace,
} from "./constant/regex";

enum SimpleInputCategoryEnum {
  Primary = "primary",
  Secondary = "secondary",
  Warning = "warning",
  Danger = "danger",
}

export type CategoryInputType = `${SimpleInputCategoryEnum}`;

type InputInnerWrapperProps = {
  hasError?: boolean;
  disabled?: boolean;
  searchIcon?: boolean;
  clearIcon?: boolean;
  editIcon?: boolean;
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  size?: "small" | "middle" | "large";
  ghost?: boolean;
};

type StyledInputProps = Omit<AntdInputProps, "width"> & {
  width?: string;
  category?: CategoryInputType;
  className?: string;
  label?: React.ReactNode | string;
  textTransform?: Property.TextTransform;
};

type CustomInputProps = {
  wrapperProps?: Record<string, unknown>;
  loading?: boolean;
  onlyInteger?: boolean;
  onlyLetters?: boolean;
  capitalizeFirstLetter?: boolean;
};

export type InputProps = Omit<InputLabelProps, "label"> &
  InputInnerWrapperProps &
  StyledInputProps &
  CustomInputProps;

const FancySimpleInput = (
  props: InputProps,
  ref:
    | ((instance: unknown) => void)
    | React.RefObject<unknown>
    | null
    | undefined
) => {
  const wrapperPropsList = [
    "hasError",
    "disabled",
    "searchIcon",
    "clearIcon",
    "editIcon",
    "minWidth",
    "maxWidth",
    "width",
    "size",
    "ghost",
  ];
  const inputPropsList = [
    "disabled",
    "size",
    "type",
    "category",
    "className",
    "label",
    "textTransform",
  ];

  const inputProps = pick(props, inputPropsList);
  const innerWrapperProps = pick(props, wrapperPropsList);

  const {
    wrapperProps,
    loading,
    onlyInteger,
    onlyLetters,
    onChange,
    onBlur,
    capitalizeFirstLetter,
    ...rest
  } = omit(props, [...wrapperPropsList, ...inputPropsList, "tooltipTitle"]);

  const inputRef = React.createRef<AntdInputRef>();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef && inputRef.current?.focus();
    },
    select: () => {
      inputRef && inputRef.current?.select();
    },
  }));

  const onClearIconClick = () => {
    inputRef.current?.select();
  };

  function capitalizeFirstLetterInput(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    event.target.value =
      event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
    return event;
  }

  const keyboardDefault = ["Backspace", "Enter"];

  const onInputNumberKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.code !== "KeyE" &&
      (keyboardDefault.includes(event.code) ||
        eventCodeKey.test(event.code) ||
        eventCodeArrow.test(event.code))
    ) {
      props.onKeyDown && props.onKeyDown(event);
      return;
    }

    const invalidOnlyIntegerNumber =
      onlyInteger && (event.key === "." || event.key === ",");

    const invalidNumbers = inputProps.type === "number" && event.key === "e";

    const invalidOnlyLetters =
      inputProps.type !== "number" &&
      onlyLetters &&
      !eventKeyOnlyLetters.test(event.key);

    if (invalidOnlyIntegerNumber || invalidNumbers || invalidOnlyLetters) {
      event.preventDefault();
    } else {
      props.onKeyDown && props.onKeyDown(event);
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange &&
      onChange(
        capitalizeFirstLetter ? capitalizeFirstLetterInput(event) : event
      );
  };

  const onBlurInput = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.target.value = event.target.value
      .replace(leadingAndTrailingSpaces, "")
      .replace(multipleSpacesToOneSpace, " ");
    onBlur && onBlur(event);
    onChange && onChange(event);
  };

  return (
    <StyledInputInnerWrapper
      className="input-inner-wrapper"
      $hasError={innerWrapperProps.hasError}
      $disabled={innerWrapperProps.disabled}
      $searchIcon={innerWrapperProps.searchIcon}
      $clearIcon={innerWrapperProps.clearIcon}
      $editIcon={innerWrapperProps.editIcon}
      $minWidth={innerWrapperProps.minWidth}
      $maxWidth={innerWrapperProps.maxWidth}
      $ghost={innerWrapperProps.ghost}
      width={innerWrapperProps.width}
      size={innerWrapperProps.size}
      {...wrapperProps}
    >
      {innerWrapperProps.searchIcon && (
        <Icon
          size={12}
          classes="search__icon"
          remixiconClass="ri-search-line"
        />
      )}

      <StyledInput
        role="textbox"
        {...rest}
        {...inputProps}
        type={onlyInteger ? "number" : inputProps.type}
        ref={inputRef}
        onKeyDown={onInputNumberKeyDown}
        onChange={onChangeInput}
        onBlur={onBlurInput}
      />

      {loading && (
        <StyledSpin
          indicator={
            <Icon
              remixiconClass="ri-loader-5-line"
              color="$color-secondary-5"
              spinning
            />
          }
        />
      )}

      {innerWrapperProps.clearIcon && (
        <Icon
          size={12}
          classes="close__icon"
          remixiconClass="ri-close-line"
          onClick={onClearIconClick}
        />
      )}

      {innerWrapperProps.editIcon && (
        <Icon size={18} classes="edit__icon" remixiconClass="ri-pencil-line" />
      )}
    </StyledInputInnerWrapper>
  );
};

export const SimpleInput = React.forwardRef(FancySimpleInput);

SimpleInput.defaultProps = {
  size: "middle",
};

export const getInputHeight = ({ size }: InputProps | InputNumberProps) => {
  switch (size) {
    case "small":
      return "28px";
    case "large":
      return "40px";
    default:
      return "32px";
  }
};

export const getInputTextSizes = (size?: SizeType) => {
  switch (size) {
    case "small":
      return css`
        ${({ theme }) => theme.text.body.s.fontSize}px;
      `;
    case "large":
      return css`
        ${({ theme }) => theme.text.body.l.fontSize}px;
      `;
    default:
      return css`
        ${({ theme }) => theme.text.body.m.fontSize}px;
      `;
  }
};

export const getInputType = (category?: CategoryInputType) => {
  if (category === "secondary") {
    return css`
      ${({ theme }) => theme.colors["$color-neutral-6"]};
    `;
  }

  if (category === "warning") {
    return css`
      ${({ theme }) => theme.colors["$color-warning-5"]};
    `;
  }

  if (category === "danger") {
    return css`
      ${({ theme }) => theme.colors["$color-danger-5"]};
    `;
  }

  return css`
    ${({ theme }) => theme.colors["$color-neutral-9"]};
  `;
};

type StyledInputInnerWrapperProps = {
  $hasError?: boolean;
  $disabled?: boolean;
  $searchIcon?: boolean;
  $clearIcon?: boolean;
  $editIcon?: boolean;
  $minWidth?: string;
  $maxWidth?: string;
  $ghost?: boolean;
  width?: string;
  size?: "small" | "middle" | "large";
};

const StyledInputInnerWrapper = styled.div<StyledInputInnerWrapperProps>`
  height: ${({ size }) => getInputHeight({ size })};

  ${({ theme }) =>
    css`
      border-radius: 4px;
      padding: 0px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: left;
      align-items: center;
      background-color: ${theme.colors["$color-neutral-1"]};
      border: 1px solid ${theme.colors["$color-neutral-4"]};

      &:hover,
      &:focus {
        border: 1px solid ${theme.colors["$color-primary-1"]};
        box-shadow: ${theme.shadows.elevationMedium};
      }
    `}

  ${({ $ghost, theme }) =>
    $ghost &&
    css`
      border: 1px solid ${theme.colors["$color-neutral-3"]};

      &:hover {
        border: 1px solid ${theme.colors["$color-primary-1"]};
      }
    `}
  

  ${({ $hasError, theme }) =>
    $hasError &&
    css`
      border: 1px solid ${theme.colors["$color-danger-5"]};

      &:hover,
      &:active,
      &:focus {
        border-color: ${theme.colors["$color-danger-5"]};
        box-shadow: none;
      }
    `}

  ${({ $disabled, theme }) =>
    $disabled &&
    css`
      background-color: ${theme.colors["$color-transparent-light-95"]};
      border-color: ${theme.colors["$color-neutral-5"]};
      color: ${theme.colors["$color-transparent-dark-25"]};

      &:hover,
      &:active,
      &:focus {
        border-color: ${theme.colors["$color-transparent-dark-25"]};
        box-shadow: none;
      }
    `}

  ${({ $searchIcon, $disabled, $hasError, theme }) =>
    $searchIcon &&
    css`
      & .search__icon {
        padding-left: 8px;
        color: ${$disabled
          ? theme.colors["$color-neutral-5"]
          : $hasError
          ? theme.colors["$color-danger-5"]
          : theme.colors["$color-primary-1"]};
      }
    `}

    ${({ $clearIcon, $disabled, $hasError, theme }) =>
    $clearIcon &&
    css`
      & .close__icon {
        color: ${theme.colors["$color-neutral-1"]};
        border-radius: 10px;
        margin-right: 8px;
        background-color: ${$disabled
          ? theme.colors["$color-neutral-5"]
          : $hasError
          ? theme.colors["$color-danger-5"]
          : theme.colors["$color-primary-1"]};

        &:hover {
          cursor: pointer;
        }
      }
    `}

    ${({ $editIcon, $disabled, $hasError, theme }) =>
    $editIcon &&
    css`
      & .edit__icon {
        color: ${theme.colors["$color-primary-1"]};
        margin-right: 8px;
        background-color: ${$disabled
          ? theme.colors["$color-neutral-5"]
          : $hasError
          ? theme.colors["$color-danger-5"]
          : theme.colors["white"]};

        &:hover {
          cursor: pointer;
        }
      }
    `}

    ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

    ${({ $minWidth }) =>
    $minWidth &&
    css`
      min-width: ${$minWidth};
    `}

    ${({ $maxWidth }) =>
    $maxWidth &&
    css`
      max-width: ${$maxWidth};
    `}
`;

const StyledInput = styled(AntdInput)<StyledInputProps>`
  ${({ theme, size, category, disabled, type, textTransform }) =>
    css`
      border-radius: 4px;

      &.ant-input-affix-wrapper,
      &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover,
      &.ant-input-affix-wrapper-focused {
        border: none;
        box-shadow: none;
        background-color: ${theme.colors.transparent};
        .ant-input {
          background-color: ${theme.colors.transparent};
          text-transform: ${textTransform ? `${textTransform}` : ""};
        }
      }

      &.ant-input,
      .ant-input-group-addon:not(:first-child):not(:last-child),
      .ant-input-group-wrap:not(:first-child):not(:last-child),
      .ant-input-group > .ant-input:not(:first-child):not(:last-child) {
        font-size: ${getInputTextSizes(size)};
        font-family: ${theme.text.fonts.mavenProRegular};
        font-style: ${theme.text.body.m.fontStyle};
        font-weight: ${theme.text.body.m.fontWeight};
        line-height: ${`${theme.text.body.m.lineHeight}px`};
        text-transform: ${textTransform ? `${textTransform}` : ""};
        padding: ${type === "number" ? "8px" : "8px 12px "};
        color: ${disabled
          ? theme.colors["$color-neutral-9"]
          : getInputType(category)};
        opacity: ${disabled
          ? theme.text.opacity.disabled
          : theme.text.opacity.primary};
        background-color: ${theme.colors.transparent};
        height: 100%;
        border: none;
        outline: 0;

        &:hover,
        &:active,
        &:focus {
          border-color: none;
          box-shadow: none;
        }

        &::placeholder {
          color: ${theme.colors["$color-neutral-6"]};
          text-overflow: initial;
        }
      }
    `}
`;

const StyledSpin = styled(Spin)`
  padding-right: 8px;
`;
