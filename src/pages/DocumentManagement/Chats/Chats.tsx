import { StyledContainer } from "../../../ui/Container/Container.styled";
import ChatProvider from "./ChatContext";
import Text from "../../../ui/Typography/Text";
import styled, { css } from "styled-components";
import Contacts from "./Contacts";
import Chat from "./Chat";
export const Chats = () => {
  return (
    <ChatProvider>
      <>
        <StyledContainerWrapper width="100%" display="flex" alignItems="center" justifyContent="space-between">
          <Text level={5} weight="bold">
            CHAT
          </Text>
        </StyledContainerWrapper>
        <StyledContainer display="flex" width="100%">
          <Contacts />
          <Chat />
        </StyledContainer>
      </>
    </ChatProvider>
  );
};

const StyledContainerWrapper = styled(StyledContainer)`
  padding: 8px 40px;

  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors["$color-transparent-dark-95"]};
  `}
`;
