import HeaderPlus from "../../../ui/Header/HeaderPlus";
import styled from "styled-components";
import RolsTable from "./RolsTable";
import Container from "../../../ui/Container";
import { useState } from "react";

export const Rols = () => {
  const [visibleModal, setVisibleModal] = useState(false);
//   const [changeData, setChangeData] = useState(false);

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

//   const onUpdateTable = () => {
//     setChangeData(true);
//   };

  return (
    <StyledContainer width="100%">
      <HeaderPlus title="ROLES" setVisibleModal={onToggleModal} />
      <RolsTable />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  width: 100% !important;
`;
