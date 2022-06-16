import { useContext } from "react";
import styled, { css } from "styled-components";
import { API } from "../../../../../shared/utils/constant/api";
import Text from "../../../../../ui/Typography/Text";
import { ChatCxt } from "../../ChatContext";
import { IContact } from "../../types/tyes";

interface Props {
  contact: IContact;
}
export const Contact = ({ contact }: Props) => {
  const { setContact } = useContext(ChatCxt);
  return (
    <StyledChatContact
      key={contact.id}
      onClick={() => {
        setContact(contact);
      }}
    >
      <StyledImgChatContact src={`${API}/user_photos/${contact.photo}`} alt={`${contact.fullname} avatar`} />
      <Text level={3}>{contact.fullname}</Text>
    </StyledChatContact>
  );
};
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
