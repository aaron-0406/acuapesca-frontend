import { ContainerProps, StyledContainer } from "./Container.styled";

export interface IContainerProps extends ContainerProps {
  readonly?: boolean;
}

export const Container = ({ centered = false, ...props }: ContainerProps) => {
  return <StyledContainer {...props} centered={+centered} />;
};
