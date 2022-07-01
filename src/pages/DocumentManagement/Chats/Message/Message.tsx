import { IMessage } from '../types/tyes'
import { getAuthToken } from '../../../../shared/utils/storage/auth'
import jwtDecode from 'jwt-decode'
import styled, { css } from 'styled-components'
import moment from 'moment'
import Container from '../../../../ui/Container'
import Icon from '../../../../ui/Icon'
interface Props {
  message: IMessage
}
export const Message = ({ message }: Props) => {
  const token = getAuthToken()
  const user = jwtDecode<any>(`${token}`)

  let MessageItem = LeftMesaggeStyled
  let justify = 'flex-start'
  let icono = 0
  if (message.id_emisor === user.id) {
    icono = message.status
    MessageItem = RightMesaggeStyled
    justify = 'flex-end'
  }

  return (
    <Container display="flex" width="100%" justifyContent={justify}>
      <MessageItem>
        <StyledTextArea className={message.id_emisor === user.id ? 'right' : 'left'}>{message.text}</StyledTextArea>
        <TimeWrapper>
          <div>{moment(message.date).format('LT')}</div>
          {icono === 1 && (
            <Icon remixiconClass="ri-check-line" alignSelf={'flex-end'} verticalAlign={'flex-end'} size={12}></Icon>
          )}
          {icono === 2 && (
            <Icon
              remixiconClass="ri-check-double-line"
              alignSelf={'flex-end'}
              verticalAlign={'flex-end'}
              size={12}
            ></Icon>
          )}
          {icono === 3 && (
            <Icon
              color="cyan5"
              remixiconClass="ri-check-double-line"
              alignSelf={'flex-end'}
              verticalAlign={'flex-end'}
              size={12}
            ></Icon>
          )}
        </TimeWrapper>
      </MessageItem>
    </Container>
  )
}
const StyledTextArea = styled.div`
  color: #fff;
  overflow-wrap: break-word;
  max-width: 400px;
  margin-bottom: 4px;
  ${(props) =>
    props.className === 'right' &&
    css`
      margin-right: 70px;
    `}
  ${(props) =>
    props.className === 'left' &&
    css`
      margin-right: 60px;
    `}
`
const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  flex-direction: row;
  position: absolute;
  bottom: 5px;
  right: 10px;
  gap: 4px;
  /* transform: translate(5px, 9px); */
`

const LeftMesaggeStyled = styled.div`
  ::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: -10px;
    border-right: 5px solid #202c33;
    border-top: 5px solid #202c33;
    border-left: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  height: auto;
  background: #202c33;
  color: #fff;
  position: relative;
  max-width: 500px;
  border-radius: 10px;
  border-top-left-radius: 0px;
  padding: 10px;
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  gap: 25px;
  position: relative;
`

const RightMesaggeStyled = styled.div`
  ::after {
    content: ' ';
    position: absolute;
    top: 0;
    right: -10px;
    border-left: 5px solid #005c4b;
    border-bottom: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #005c4b;
  }
  height: auto;
  background: #005c4b;
  color: #fff;
  max-width: 500px;
  border-radius: 10px;
  border-top-right-radius: 0px;
  position: relative;
  padding: 10px;
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  gap: 25px;
  position: relative;
`
