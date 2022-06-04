import styled, { css } from "styled-components";
import Button from "../../Button";
import Container from "../../Container";
import Icon from "../../Icon";
import Title from "../../Typography/Title";

interface IHeaderPlusProps {
  title: string;
}

export const HeaderPlus = ({ title }: IHeaderPlusProps) => {
  return (
    <StyledContainer
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Title level={5} weight="bold">
        {title}
      </Title>
      <Button
        size="large"
        icon={<Icon size={28} remixiconClass="ri-add-line" />}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding: 10px 20px;

  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors["$color-transparent-dark-95"]};
  `}
`;
