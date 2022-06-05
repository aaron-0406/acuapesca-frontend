import { useState } from "react";
import styled from "styled-components";
import Container from "../../../../ui/Container";
import HeaderPlus from "../../../../ui/Header/HeaderPlus";
import ProcessesModal from "./ProcessesModal";
import ProcessesTable from "./ProcessesTable";

export const Processes = () => {
  const [visibleModal, setVisibleModal] = useState(false);

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  return (
    <StyledContainer width="100%">
      <HeaderPlus title="PROCESOS" setVisibleModal={onToggleModal} />
      <ProcessesTable />
      <ProcessesModal visible={visibleModal} setVisible={onToggleModal} />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  width: 100% !important;
`;
