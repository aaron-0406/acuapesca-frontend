import { useState } from "react";
import styled, { css } from "styled-components";
import ProcessesModal from "../../../pages/DocumentManagement/Documentary/Processes/ProcessesModal";
import Button from "../../Button";
import Container from "../../Container";
import Icon from "../../Icon";
import Text from "../../Typography/Text";

interface IHeaderPlusProps {
  title: string;
}

export const HeaderPlus = ({ title }: IHeaderPlusProps) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const onClickModal = () => {
    setVisibleModal(!visibleModal);
  };

  return (
    <>
      <StyledContainer
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text level={5} weight="bold">
          {title}
        </Text>
        <Button
          size="large"
          icon={<Icon size={28} remixiconClass="ri-add-line" />}
          onClick={onClickModal}
        />
      </StyledContainer>
      <ProcessesModal visible={visibleModal} setVisible={onClickModal} />
    </>
  );
};

const StyledContainer = styled(Container)`
  padding: 8px 20px;

  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors["$color-transparent-dark-95"]};
  `}
`;
