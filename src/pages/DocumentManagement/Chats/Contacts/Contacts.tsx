import { useContext } from "react";
import styled, { css } from "styled-components";
import { ChatCxt } from "../ChatContext";
import { IContact } from "../types/tyes";
import Contact from "./Contact";

export const Contacts = () => {
  const { contacts } = useContext(ChatCxt);
  return (
    <StyledWrapper>
      {contacts.map((contacto: IContact) => {
        return <Contact key={contacto.id} contact={contacto}></Contact>;
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
