import styled, { css } from "styled-components";
import Button from "../../Button";
import Container from "../../Container";
import Icon from "../../Icon";
import Text from "../../Typography/Text";

interface IHeaderPlusProps {
  title: string;
  setVisibleModal: () => void;
  plusHeader?: React.ReactNode;
}

export const HeaderPlus = ({
  title,
  setVisibleModal,
  plusHeader,
}: IHeaderPlusProps) => {
  return (
    <>
      <StyledContainer
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Container display="flex" gap="30px">
          <Text level={5} weight="bold">
            {title}
          </Text>
          {plusHeader}
        </Container>

        <Button
          size="large"
          icon={<Icon size={28} remixiconClass="ri-add-line" />}
          onClick={setVisibleModal}
        />
      </StyledContainer>
    </>
  );
};

const StyledContainer = styled(Container)`
  padding: 8px 40px;

  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors["$color-transparent-dark-95"]};
  `}
`;
