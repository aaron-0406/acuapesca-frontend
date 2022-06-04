import styled from "styled-components";
import Container from "../../../../ui/Container";
import HeaderPlus from "../../../../ui/Header/HeaderPlus";
import ProcessesTable from "./ProcessesTable";

export const Processes = () => {
  return (
    <StyledContainer width="100%">
      <HeaderPlus title="PROCESOS" />
      <ProcessesTable />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  width: 100% !important;
`;
