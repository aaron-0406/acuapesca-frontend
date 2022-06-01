import React from "react";
import styled from "styled-components";

type WrapperProps = Omit<React.ComponentProps<"div">, "ref">;

export const SimpleWrapper = (
  props: WrapperProps,
  ref:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined
) => {
  return <StyledWrapper ref={ref} {...props} />;
};

export const Wrapper = React.forwardRef(SimpleWrapper);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
