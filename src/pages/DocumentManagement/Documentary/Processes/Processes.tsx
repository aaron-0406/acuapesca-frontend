import { useState } from "react";
import styled from "styled-components";
import Container from "../../../../ui/Container";
import HeaderPlus from "../../../../ui/Header/HeaderPlus";
import ProcessesModal from "./ProcessesModal";
import ProcessesTable from "./ProcessesTable";

export const Processes = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [changeData, setChangeData] = useState(false);

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const onUpdateTable = () => {
    setChangeData(true);
  };

  return (
    <StyledContainer width="100%">
      <HeaderPlus title="PROCESOS" setVisibleModal={onToggleModal} />
      <ProcessesTable changeData={changeData} setChangeData={setChangeData} />
      <ProcessesModal
        updateData={onUpdateTable}
        visible={visibleModal}
        setVisible={onToggleModal}
      />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  width: 100% !important;
`;
