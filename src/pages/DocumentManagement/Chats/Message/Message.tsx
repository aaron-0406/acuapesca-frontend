import { IMessage } from "../types/tyes";
import { getAuthToken } from "../../../../shared/utils/storage/auth";
import jwtDecode from "jwt-decode";
import styled from "styled-components";
import { useEffect, useRef } from "react";

interface Props {
  message: IMessage;
}
export const Message = ({ message }: Props) => {
  const token = getAuthToken();
  const user = jwtDecode<any>(`${token}`);
  const messageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messageRef.current) messageRef.current.innerHTML = message.text;
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (message.id_emisor === user.id) return <RightMesaggeStyled ref={messageRef}></RightMesaggeStyled>;
  return <LeftMesaggeStyled ref={messageRef}></LeftMesaggeStyled>;
};

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
