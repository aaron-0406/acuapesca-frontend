import { useState } from "react";
import styled from "styled-components";
import Container from "../../../ui/Container";
import HeaderPlus from "../../../ui/Header/HeaderPlus";
import UsersProvider from "./UsersContext";
import UsersModalCreate from "./UsersModal/UsersModalCreate";
import UsersTable from "./UsersTable";

export const Users = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [changeData, setChangeData] = useState(false);

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const onUpdateTable = () => {
    setChangeData(true);
  };
  return (
    <UsersProvider>
      <StyledContainer width="100%">
        <HeaderPlus
          title="USUARIOS"
          disabledButton={false}
          setVisibleModal={onToggleModal}
        />
        <UsersTable
          updateData={onUpdateTable}
          changeData={changeData}
          setChangeData={setChangeData}
        />
        <UsersModalCreate
          updateData={onUpdateTable}
          visible={visibleModal}
          setVisible={onToggleModal}
        />
      </StyledContainer>
    </UsersProvider>
  );
};

const StyledContainer = styled(Container)`
  height: 100vh;
`;
