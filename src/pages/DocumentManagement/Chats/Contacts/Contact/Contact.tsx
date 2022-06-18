import { useContext } from "react";
import styled, { css } from "styled-components";
import { API } from "../../../../../shared/utils/constant/api";
import Container from "../../../../../ui/Container";
import Text from "../../../../../ui/Typography/Text";
import { ChatCxt } from "../../ChatContext";
import { IContact, IContactStatus } from "../../types/tyes";

interface Props {
  contactProp: IContact;
  contactTypingState: IContactStatus;
}
export const Contact = ({ contactProp, contactTypingState }: Props) => {
  const { setContact, setTypingState,setOnlineState } = useContext(ChatCxt);

  return (
    <StyledChatContact
      key={contactProp.id}
      onClick={() => {
        setContact(contactProp);
        setTypingState(false);
        setOnlineState(contactTypingState.online)
      }}
    >
      <Container display="flex" justifyContent="center" position="relative">
        <StyledImgChatContact src={`${API}/user_photos/${contactProp.photo}`} alt={`${contactProp.fullname} avatar`} />
        {contactTypingState ? contactTypingState.online && <StyledOnlineFigure></StyledOnlineFigure> : <></>}
      </Container>
      <Container display="flex" justifyContent="flex-start" flexDirection="column">
        <Text level={3}>{contactProp.fullname}</Text>
        {contactTypingState && (
          <StyledCTyping level={3}>{contactTypingState.typing ? "Escribiendo..." : contactProp.messages.length > 0 ? contactProp.messages[contactProp.messages.length - 1].text : ""}</StyledCTyping>
        )}
      </Container>
    </StyledChatContact>
  );
};
const StyledOnlineFigure = styled.div`
  background: #00a67e;
  border-radius: 50%;
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 5px;
  right: 20px;
`;
const StyledCTyping = styled(Text)`
  color: #00a67e;
`;
const StyledChatContact = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors["$color-transparent-3"]};
    `}
  height: 60px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 35px 10px;
  border: 1px solid #fff;
  :hover {
    opacity: 0.7;
  }
`;
const StyledImgChatContact = styled.img`
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;
