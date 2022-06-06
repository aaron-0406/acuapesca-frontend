import HeaderPlus from "../../../ui/Header/HeaderPlus";
import styled from "styled-components";
import RolsTable from "./RolsTable";
import Container from "../../../ui/Container";
import { useState } from "react";
import RolsModalCreate from "./RolsModal/RolsModalCreate";
import RolsProvider from "./RolsContext";

export const Rols = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [changeData, setChangeData] = useState(false);

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const onUpdateTable = () => {
    setChangeData(true);
  };

  return (
    <RolsProvider>
      <StyledContainer width="100%">
        <HeaderPlus title="ROLES" setVisibleModal={onToggleModal} />
        <RolsTable updateData={onUpdateTable} changeData={changeData} setChangeData={setChangeData} />
        <RolsModalCreate updateData={onUpdateTable} visible={visibleModal} setVisible={onToggleModal} />
      </StyledContainer>
    </RolsProvider>
  );
};

const StyledContainer = styled(Container)`
  height: 100vh;
`;
