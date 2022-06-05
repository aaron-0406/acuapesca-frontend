import HeaderPlus from "../../../ui/Header/HeaderPlus";
import styled from "styled-components";
import RolsTable from "./RolsTable";
import Container from "../../../ui/Container";

export const Rols = () => {
  return (
    <StyledContainer width="100%">
      <HeaderPlus title="ROLES" />
      <RolsTable />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  width: 100% !important;
`;
