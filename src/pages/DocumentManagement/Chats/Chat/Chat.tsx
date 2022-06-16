import jwtDecode from "jwt-decode";
import { useContext, useRef } from "react";
import styled, { css } from "styled-components";
import { API } from "../../../../shared/utils/constant/api";
import { getAuthToken } from "../../../../shared/utils/storage/auth";
// import { sendMessage } from "../../../../shared/utils/services/chatsServices";
import EmptyState from "../../../../ui/EmptyState";
import Icon from "../../../../ui/Icon";
import Text from "../../../../ui/Typography/Text";
import { ChatCxt } from "../ChatContext";
import { IMessage } from "../types/tyes";

export const Chat = () => {
  const { contact, sendMessage } = useContext(ChatCxt);
  const input = useRef<HTMLDivElement>(null);
  const iconSend = useRef<HTMLDivElement>(null);
  const NUMBER_OF_LETTERS_TO_DELETE = 15;
  const token = getAuthToken();
  const user = jwtDecode<any>(`${token}`);

  const handleChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (iconSend.current && input.current) {
        input.current.innerHTML = input.current.innerHTML.slice(0, input.current.innerHTML.length - NUMBER_OF_LETTERS_TO_DELETE);
        iconSend.current.click();
      }
    }
  };

  const handleSubmit = () => {
    if (input.current) {
      if (input.current.innerText.trim() === "") return;
      const newMessage: IMessage = {
        date: new Date().toISOString(),
        id_emisor: user.id,
        id_receptor: parseInt(`${contact.id}`),
        text: input.current.innerHTML,
      };
      sendMessage(newMessage);
      if (input.current) input.current.innerHTML = "";
    }
  };

  return (
    <StyledWrapper>
      {contact.id ? (
        <>
          <HeaderChat>
            <StyledImgChatContact src={`${API}/user_photos/${contact.photo}`} alt="avatar" />
            <Text>{contact.fullname}</Text>
          </HeaderChat>
          <BodyChat>
            {contact.messages.map((message, i) => {
              if (message.id_emisor === user.id) return <RightMesaggeStyled key={i + 2005}>{message.text}</RightMesaggeStyled>;
              return <LeftMesaggeStyled key={i + 2005}>{message.text}</LeftMesaggeStyled>;
            })}
          </BodyChat>
          <FooterChat>
            <StyledTextArea ref={input} onKeyUp={handleChange} contentEditable="true" />
            <StyledWrapperIcon ref={iconSend} onClick={handleSubmit}>
              <Icon cursor={"pointer"} size={40} remixiconClass="ri-send-plane-2-fill" />
            </StyledWrapperIcon>
          </FooterChat>
        </>
      ) : (
        <EmptyState fullScreen title="Mensajería" description="Escoja un chat para poder enviar mensajes" />
      )}
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors["$color-transparent-3"]};
    `}
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid #fff;
  height: calc(100vh - 49px);
  max-height: 100vh;
`;
const HeaderChat = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors["$color-primary-2"]};
    `}
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const BodyChat = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors["$color-transparent-3"]};
      &::-webkit-scrollbar-thumb {
        -webkit-appearance: none;
        background-color: ${theme.colors["$color-primary-2"]};
        width: 5px;
        height: 5px;
      }
      &::-webkit-scrollbar {
        width: 5px;
      }
    `}
  display:flex;
  flex-direction: column;
  padding: 20px;
  height: calc(100vh - 194px);
  width: 100%;
  gap: 10px;
  overflow-y: scroll;
`;

const LeftMesaggeStyled = styled.div`
  ::after {
    content: " ";
    position: absolute;
    top: 0;
    left: -10px;
    border-right: 5px solid #202c33;
    border-top: 5px solid #202c33;
    border-left: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  background: #202c33;
  color: #fff;
  position: relative;
  max-width: 500px;
  border-radius: 10px;
  border-top-left-radius: 0px;
  padding: 10px;
  align-self: flex-start;
`;

const RightMesaggeStyled = styled.div`
  ::after {
    content: " ";
    position: absolute;
    top: 0;
    right: -10px;
    border-left: 5px solid #005c4b;
    border-bottom: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #005c4b;
  }
  background: #005c4b;
  color: #fff;
  max-width: 500px;
  border-radius: 10px;
  border-top-right-radius: 0px;
  position: relative;
  padding: 10px;
  align-self: flex-end;
`;

const FooterChat = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors["$color-primary-2"]};
    `}
  height: 75px;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledImgChatContact = styled.img`
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;
const StyledTextArea = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors["$color-transparent-3"]};
      &::-webkit-scrollbar-thumb {
        -webkit-appearance: none;
        background-color: ${theme.colors["$color-primary-2"]};
        width: 10px;
        height: 5px;
      }
      &::-webkit-scrollbar {
        width: 10px;
      }
    `}
  width: 95%;
  color: #fff;
  padding: 10px;
  overflow-y: scroll;
  height: 45px;
  border-radius: 10px;
  margin-right: 10px;
  background: #2a3942;
`;

const StyledWrapperIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
