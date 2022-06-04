import styled from "styled-components";
import Container from "../../../../ui/Container";
import HeaderPlus from "../../../../ui/Header/HeaderPlus";

export const Processes = () => {
  return (
    <StyledContainer width="100%">
      <HeaderPlus title="PROCESOS" />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  width: 100% !important;
`;
