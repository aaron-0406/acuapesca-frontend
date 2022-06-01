import styled, { css } from "styled-components";
import Text from "../../Typography/Text";
import { TypographyTextProps } from "../../Typography/Text";

interface IInputHelperText extends TypographyTextProps {
  $hasError?: boolean;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  wrap?: boolean;
}

export const InputHelperText = ({
  children,
  top,
  right,
  bottom,
  wrap,
  $hasError = false,
  left = "0",
  ...props
}: IInputHelperText) => {
  return children ? (
    <StyledInputHelperTextWrapper
      $hasError={$hasError}
      className="input-helper"
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      wrap={wrap}
    >
      <Text level={4} weight="regular" {...props}>
        {children}
      </Text>
    </StyledInputHelperTextWrapper>
  ) : null;
};

interface StyledInputHelperTextWrapperProps {
  $hasError: boolean;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  wrap?: boolean;
}

export const StyledInputHelperTextWrapper = styled.div<StyledInputHelperTextWrapperProps>`
  position: absolute;

  ${({ wrap }) =>
    css`
      white-space: ${wrap ? "normal" : "nowrap"};
    `}

  ${({ top }) =>
    top &&
    css`
      top: ${top};
    `}

  ${({ right }) =>
    right &&
    css`
      right: ${right};
    `}

  ${({ bottom }) =>
    bottom &&
    css`
      bottom: ${bottom};
    `}

  ${({ left }) =>
    left &&
    css`
      left: ${left};
    `}


  & .ant-typography {
    opacity: 1;
    ${({ theme, $hasError }) =>
      css`
        color: ${$hasError
          ? theme.colors["$color-error"]
          : theme.colors["$color-transparent-4"]};
      `}
  }
`;
