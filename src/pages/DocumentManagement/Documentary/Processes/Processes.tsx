import { useState } from "react";
import styled from "styled-components";
import Container from "../../../../ui/Container";
import HeaderPlus from "../../../../ui/Header/HeaderPlus";
import ProcessesModalCreate from "./ProcessesModal/ProcessesModalCreate";
import ProcessesTable from "./ProcessesTable";

export const Processes = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [changeData, setChangeData] = useState(false);

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const onUpdateTable = () => {
    setChangeData(!changeData);
  };

  return (
    <StyledProcessesContainer width="100%">
      <HeaderPlus title="PROCESOS" setVisibleModal={onToggleModal} />
      <ProcessesTable
        updateData={onUpdateTable}
        changeData={changeData}
      />
      <ProcessesModalCreate
        updateData={onUpdateTable}
        visible={visibleModal}
        setVisible={onToggleModal}
      />
    </StyledProcessesContainer>
  );
};

const StyledProcessesContainer = styled(Container)`
  height: 100vh;
`;
