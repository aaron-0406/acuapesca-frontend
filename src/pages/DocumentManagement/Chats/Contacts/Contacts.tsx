import { useContext } from "react";
import styled, { css } from "styled-components";
import { API } from "../../../../shared/utils/constant/api";
import Text from "../../../../ui/Typography/Text";
import { ChatCxt } from "../ChatContext";
import { IContact } from "../types/tyes";

export const Contacts = () => {
  const { contacts, setContact } = useContext(ChatCxt);
  return (
    <StyledWrapper>
      {contacts.map((contacto: IContact) => {
        return (
          <StyledChatContact
            key={contacto.id}
            onClick={() => {
              setContact(contacto);
            }}
          >
            <StyledImgChatContact src={`${API}/user_photos/${contacto.photo}`} alt={`${contacto.fullname} avatar`} />
            <Text level={3}>{contacto.fullname}</Text>
          </StyledChatContact>
        );
      })}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
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
  width: 30%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 49px);
  overflow-y: scroll;
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
