import React from "react";
import { StyledButton, IStyledButton } from "./Buttons.styled";

export type ButtonProps = IStyledButton & {
  title?: string | React.ReactNode;
  trailIcon?: React.ReactNode;
  leadIcon?: React.ReactNode;
  tight?: boolean;
};

export const Button = ({
  title,
  trailIcon,
  leadIcon,
  loading,
  tight,
  ...props
}: ButtonProps) => (
  <StyledButton
    loading={loading}
    $tight={tight}
    role="button"
    icon={!loading && trailIcon}
    {...props}
  >
    {title}
    {leadIcon}
  </StyledButton>
);
