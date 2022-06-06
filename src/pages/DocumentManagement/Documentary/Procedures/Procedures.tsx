import { useState } from "react";
import styled, { css } from "styled-components";
import Button from "../../../../ui/Button";
import Container from "../../../../ui/Container";
import HeaderPlus from "../../../../ui/Header/HeaderPlus";
import Icon from "../../../../ui/Icon";
import { IProceduresForm } from "../types/types";
import ProceduresProcessTable from "./SectionProcedures/ProceduresProcessTable";
import ProceduresProcessTitle from "./SectionProcedures/ProceduresProcessTitle";

export const Procedures = () => {
  const [procedureSelected, setProcedureSelected] =
    useState<IProceduresForm | null>(null);
  const [changeData, setChangeData] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const onToggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  const onUpdateTable = () => {
    setChangeData(!changeData);
  };

  return (
    <StyledProcessContainer display="flex" width="100%">
      <StyledProceduresContainer
        width="45%"
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
          title="Añadir procedimiento"
        />
      </StyledProceduresContainer>
      <Container>
        <HeaderPlus
          title={procedureSelected?.title ? procedureSelected?.title : "--"}
          setVisibleModal={onToggleModal}
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
