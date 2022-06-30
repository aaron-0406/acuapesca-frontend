import { ChatContext, IContact, IContactStatus, IMessage } from '../types/tyes'
import React, { useEffect, useState } from 'react'
import { getContacts } from '../../../../shared/utils/services/chatsServices'
import {
  connectSocket,
  disconnectSocket,
  socket,
  socketsRoutes,
} from '../../../../shared/utils/services/socketio/socketIo'
import { getAuthToken } from '../../../../shared/utils/storage/auth'
import jwtDecode from 'jwt-decode'
import { useLocation } from 'react-router-dom'

export const ChatCxt = React.createContext({} as ChatContext)

export const ChatProvider = ({ children }: { children: JSX.Element }) => {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [contact, setContact] = useState<IContact>({ fullname: '', photo: '', messages: [] })
  const [typingState, setTypingState] = useState<boolean>(false)
  const [typingStateMe, setTypingStateMe] = useState<boolean>(false)
  const [onlineState, setOnlineState] = useState<boolean>(false)
  const [contactTyping, setContactTyping] = useState<IContactStatus[]>([])
  const token = getAuthToken()
  const user = jwtDecode<any>(`${token}`)
  const location = useLocation()

  const auth_token = getAuthToken()
  const getContactsData = async () => {
    try {
      const res = await getContacts()
      const { data } = res
      const { success, error, users } = data
      if (success) {
        setContacts(users)
        const typingItems: IContactStatus[] = []
        for (let i = 0; i < users.length; i++) typingItems.push({ id: users[i].id, typing: false, online: false })
        setContactTyping(typingItems)
      }
      if (error) setContacts([])
      return users
    } catch (error) {
      setContacts([])
      return []
    }
  }

  useEffect(() => {
    if (socket?.connected) return
    connectSocket(auth_token)
    return () => {
      disconnectSocket()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (socket) {
      socket.on(socketsRoutes.sendMessage.on, getMessage)
      socket.on(socketsRoutes.typing.on, getTyping)
      socket.on(socketsRoutes.userDisconnected.on, userDisconnected)
      socket.on(socketsRoutes.received.on, receviedMessage)
      socket.on(socketsRoutes.newUserConnected.on, newUserConnected)
    }
    return () => {
      if (socket) {
        socket.off(socketsRoutes.sendMessage.on, getMessage)
        socket.off(socketsRoutes.typing.on, getTyping)
        socket.off(socketsRoutes.userDisconnected.on, userDisconnected)
        socket.off(socketsRoutes.received.on, receviedMessage)
        socket.off(socketsRoutes.newUserConnected.on, newUserConnected)
      }
    }

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, contacts, contact, contactTyping])

  const receviedMessage = (message: IMessage) => {
    setContacts(
      contacts.map((contactItem: IContact) => {
        if (message.id_receptor === contactItem.id) {
          const { messages } = contactItem
          const newMessages = messages.map((messageItem: IMessage) => {
            if (messageItem.id === message.id) return message
            return messageItem
          })
          return { ...contactItem, messages: newMessages }
        }
        return contactItem
      }),
    )
    if (contact.id === message.id_receptor) {
      const { messages } = contact
      const newMessages = messages.map((messageItem: IMessage) => {
        if (messageItem.id === message.id) return message
        return messageItem
      })
      setContact({ ...contact, messages: newMessages })
    }
  }

  const newUserConnected = async (body: any) => {
    const users = await getContactsData()
    const ids: number[] = []
    for (let i = 0; i < body.length; i++) ids.push(body[i].id)
    setContactTyping(
      users.map((item: IContactStatus) => {
        if (ids.includes(parseInt(`${contact.id}`))) setOnlineState(true)
        if (ids.includes(item.id)) return { ...item, online: true }
        return { ...item, online: false }
      }),
    )
    setContacts(
      users.map((item: IContact) => {
        if (ids.includes(parseInt(`${item.id}`))) {
          const newMessages = item.messages.map((itemMessage: IMessage) => {
            if (itemMessage.status === 1) return { ...itemMessage, status: 2 }
            return itemMessage
          })
          item.messages = newMessages
          return item
        }
        return item
      }),
    )
    if (ids.includes(parseInt(`${contact.id}`))) {
      const newMessages = contact.messages.map((itemMessage: IMessage) => {
        if (itemMessage.status === 1) return { ...itemMessage, status: 2 }
        return itemMessage
      })
      setContact({ ...contact, messages: newMessages })
    }
  }

  const userDisconnected = (body: any) => {
    const ids: number[] = []
    for (let i = 0; i < body.length; i++) ids.push(body[i].id)
    setContactTyping(
      contactTyping.map((item: IContactStatus) => {
        if (!ids.includes(parseInt(`${contact.id}`))) setOnlineState(false)
        if (ids.includes(item.id)) return { ...item, online: true }
        return { ...item, online: false }
      }),
    )
  }

  const getTyping = (id: number) => {
    setContactTyping(
      contactTyping.map((contactItem) => {
        if (contactItem.id === id) return { ...contactItem, typing: true }
        return contactItem
      }),
    )
    setTimeout(() => {
      setContactTyping(
        contactTyping.map((contactItem) => {
          if (id === contactItem.id) return { ...contactItem, typing: false }
          return contactItem
        }),
      )
    }, 1000)
    if (contact.id === id) {
      setTypingState(true)
      setTimeout(() => {
        setTypingState(false)
      }, 1000)
    }
  }

  const getMessage = (message: IMessage) => {
    if (
      (contact.id === message.id_emisor && user.id === message.id_receptor) ||
      (contact.id === message.id_receptor && user.id === message.id_emisor)
    ) {
      const { messages } = contact
      const newMessages = [...messages, message]
      setContact({ ...contact, messages: newMessages })
    }
    setContacts(
      contacts.map((contactItem: IContact) => {
        if (
          (contactItem.id === message.id_emisor && user.id === message.id_receptor) ||
          (contactItem.id === message.id_receptor && user.id === message.id_emisor)
        ) {
          contactItem.messages = [...contactItem.messages, message]
          return contactItem
        }
        return contactItem
      }),
    )
    if (!socket) return
    socket.emit(socketsRoutes.received.emit, message)
  }

  const sendMessage = (message: IMessage) => {
    // const { messages } = contact;
    // const newMessages = [...messages, message];
    // setContact({ ...contact, messages: newMessages });
    // setContacts(
    //   contacts.map((contactItem: IContact) => {
    //     if (contactItem.id === message.id_receptor) {
    //       contactItem.messages = [...contactItem.messages, message];
    //       return contactItem;
    //     }
    //     return contactItem;
    //   })
    // );
    if (!socket) return
    socket.emit(socketsRoutes.sendMessage.emit, message)
  }

  const typing = () => {
    if (!socket) return
    if (typingStateMe) return
    setTypingStateMe(true)
    socket.emit(socketsRoutes.typing.emit, contact)
    setTimeout(() => {
      setTypingStateMe(false)
    }, 3000)
  }

  return (
    <ChatCxt.Provider
      value={{
        contacts,
        setContacts,
        contact,
        setContact,
        sendMessage,
        typing,
        contactTyping,
        setContactTyping,
        typingState,
        setTypingState,
        onlineState,
        setOnlineState,
      }}
    >
      {children}
    </ChatCxt.Provider>
  )
}
