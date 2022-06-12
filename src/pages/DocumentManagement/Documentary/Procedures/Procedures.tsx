import { useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../../../ui/Button";
import Container from "../../../../ui/Container";
import HeaderPlus from "../../../../ui/Header/HeaderPlus";
import Icon from "../../../../ui/Icon";
import { IProceduresForm } from "../types/types";
import FileTitle from "./SectionFiles/FilesTitle";
import ProceduresModalAdd from "./SectionProcedures/ProceduresModal/ProceduresModalAdd";
import ProceduresModalEdit from "./SectionProcedures/ProceduresModal/ProceduresModalEdit";
import ProceduresProcessTable from "./SectionProcedures/ProceduresProcessTable";
import ProceduresProcessTitle from "./SectionProcedures/ProceduresProcessTitle";

export const Procedures = () => {
  const [procedureSelected, setProcedureSelected] =
    useState<IProceduresForm | null>(null);
  const [changeData, setChangeData] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const onToggleModalEdit = () => {
    setVisibleModalEdit(!visibleModalEdit);
  };

  const onUpdateTable = () => {
    setChangeData(!changeData);
  };

  return (
    <StyledProcessContainer display="flex" width="100%">
      <StyledProceduresContainer
        width="30%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <ProceduresProcessTitle />

        <ProceduresProcessTable
          changeData={changeData}
          updateData={onUpdateTable}
          setProcedureSelected={setProcedureSelected}
        />

        <StyledButtonAdd
          icon={<Icon size={25} remixiconClass="ri-add-line" />}
          $width="70%"
          size="large"
          title="Añadir documento"
          onClick={onToggleModal}
        />

        <ProceduresModalAdd
          updateData={onUpdateTable}
          visible={visibleModal}
          setVisible={onToggleModal}
        />
      </StyledProceduresContainer>

      <Container width="70%">
        <FileTitle
          procedure={procedureSelected}
          onToggleModal={onToggleModalEdit}
        />

        <ProceduresModalEdit
          visible={visibleModalEdit}
          setVisible={onToggleModalEdit}
          updateData={onUpdateTable}
          data={procedureSelected}
          setData={setProcedureSelected}
        />
      </Container>
    </StyledProcessContainer>
  );
};

const StyledProcessContainer = styled(Container)`
  height: 100vh;
`;

const StyledButtonAdd = styled(Button)`
  margin-bottom: 25px;
`;

const StyledProceduresContainer = styled(Container)`
  ${({ theme }) => css`
    background-color: ${theme.colors["$color-transparent-4"]};
    border-right: 6px solid ${theme.colors["white"]};
  `}
`;
