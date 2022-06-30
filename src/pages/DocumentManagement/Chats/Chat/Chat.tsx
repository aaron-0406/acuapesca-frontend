import TextArea from 'antd/lib/input/TextArea'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { API } from '../../../../shared/utils/constant/api'
import { getAuthToken } from '../../../../shared/utils/storage/auth'
import Container from '../../../../ui/Container'
import EmptyState from '../../../../ui/EmptyState'
import Icon from '../../../../ui/Icon'
import Text from '../../../../ui/Typography/Text'
import { ChatCxt } from '../ChatContext'
import Message from '../Message'
import { IMessage } from '../types/tyes'

export const Chat = () => {
  const [message, setMessage] = useState<string>('')
  const { contact, sendMessage, typing, typingState, onlineState } = useContext(ChatCxt)
  const token = getAuthToken()
  const user = jwtDecode<any>(`${token}`)
  const bodyChatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bodyChatRef.current) bodyChatRef.current.scrollTop = bodyChatRef.current.scrollHeight
  }, [contact])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    typing()
  }
  const handleTyping = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.code === 'Enter') handleSubmit()
  }

  const handleSubmit = () => {
    if (message.replace('\n', '').length === 0) return
    const newMessage: IMessage = {
      date: new Date().toISOString(),
      id_emisor: user.id,
      id_receptor: parseInt(`${contact.id}`),
      text: message,
      status: 1,
    }
    setMessage('')
    sendMessage(newMessage)
  }

  const getFancyDate = (date: string): string => {
    const DAYS: any = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miercoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
      Saturday: 'Sábado',
      Sunday: 'Domingo',
    }
    const SECOND_IN_MILISECONDS = 1000
    const DAYS_IN_SECONDS = 604800
    const today = new Date(moment().format('L'))
    const theDate = new Date(moment(date).format('L'))
    if (today.getTime() / SECOND_IN_MILISECONDS - theDate.getTime() / SECOND_IN_MILISECONDS >= DAYS_IN_SECONDS)
      return moment(theDate).format('DD[/]MM[/]YYYY')
    if (today.getDay() - 1 === theDate.getDay()) return 'Ayer'
    if (today.getDay() === theDate.getDay()) return 'Hoy'
    return DAYS[moment(theDate).format('dddd')]
  }

  return (
    <StyledWrapper>
      {contact.id ? (
        <>
          <HeaderChat>
            <StyledImgChatContact src={`${API}/user_photos/${contact.photo}`} alt="avatar" />
            <Container display="flex" justifyContent="flex-start" flexDirection="column" width="100%">
              <Text>{contact.fullname}</Text>
              <StyledCTyping level={3}>
                {typingState ? 'Escribiendo...' : onlineState ? 'En línea' : 'Desconectado'}
              </StyledCTyping>
            </Container>
          </HeaderChat>
          <BodyChat ref={bodyChatRef}>
            {contact.messages.map((message, i) => {
              if (i === 0) {
                return (
                  <React.Fragment key={i}>
                    <Container display="flex" justifyContent="center" width="100%">
                      <StyledContainer display="flex" justifyContent="center" width="95px">
                        {getFancyDate(message.date)}
                      </StyledContainer>
                    </Container>
                    <Message key={i + 200} message={message} />
                  </React.Fragment>
                )
              }
              if (
                i < contact.messages.length - 1 &&
                new Date(contact.messages[i + 1].date).getDay() !== new Date(message.date).getDay()
              ) {
                return (
                  <React.Fragment key={i}>
                    <Message message={message} />
                    <Container display="flex" justifyContent="center" width="100%">
                      <StyledContainer display="flex" justifyContent="center" width="95px">
                        {getFancyDate(contact.messages[i + 1].date)}
                      </StyledContainer>
                    </Container>
                  </React.Fragment>
                )
              }
              return <Message key={i} message={message} />
            })}
          </BodyChat>
          <FooterChat>
            <StyledTextArea
              maxLength={2000}
              onChange={handleChange}
              onKeyUp={handleTyping}
              value={message}
              placeholder="Escribe un mensaje..."
              autoSize={{ minRows: 2, maxRows: 2 }}
            ></StyledTextArea>
            <StyledWrapperIcon onClick={handleSubmit}>
              <Icon cursor={'pointer'} size={40} remixiconClass="ri-send-plane-2-fill" />
            </StyledWrapperIcon>
          </FooterChat>
        </>
      ) : (
        <EmptyState fullScreen title="Mensajería" description="Escoja un chat para poder enviar mensajes" />
      )}
    </StyledWrapper>
  )
}

const StyledContainer = styled(Container)`
  background: #182229;
  color: #aeb9bf;
  font-size: 11px;
  padding: 4px;
  border-radius: 10px;
`
const StyledCTyping = styled(Text)`
  color: #00a67e;
  font-size: 101px;
`

const StyledWrapper = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors['$color-transparent-3']};
    `}
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  border-left: 1px solid #fff;
  height: calc(100vh - 49px);
  max-height: 100vh;
`
const HeaderChat = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors['$color-primary-2']};
    `}
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const BodyChat = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors['$color-transparent-3']};
      &::-webkit-scrollbar-thumb {
        -webkit-appearance: none;
        background-color: ${theme.colors['$color-primary-2']};
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
`

const FooterChat = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors['$color-primary-2']};
    `}
  height: 75px;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledImgChatContact = styled.img`
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`
const StyledTextArea = styled(TextArea)`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors['$color-transparent-3']};
      &::-webkit-scrollbar-thumb {
        -webkit-appearance: none;
        background-color: ${theme.colors['$color-primary-2']};
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
  border-radius: 10px;
  margin-right: 10px;
  background: #2a3942;
`

const StyledWrapperIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
