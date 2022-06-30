import { io, Socket } from 'socket.io-client'
import { API } from '../../constant/api'

export let socket: Socket
export const connectSocket = (token: string) => {
  socket = io(API, {
    auth: {
      token: token,
    },
    extraHeaders: { Authorization: `Bearer ${token}` },
  })
}
export const disconnectSocket = () => {
  socket.close()
}
export const socketsRoutes = {
  sendMessage: {
    emit: 'client:sendMessage',
    on: 'server:sendMessage',
  },
  changeChannel: {
    emit: 'client:changeChat',
  },
  view: {
    emit: 'client:viewMessage',
    on: 'server:viewMessage',
  },
  received: {
    emit: 'server:receivedMessage',
    on: 'client:receivedMessage',
  },
  typing: {
    emit: 'client:typing',
    on: 'server:typing',
  },
  newUserConnected: {
    emit: 'client:sendUsers',
    on: 'server:sendUsers',
  },
  userDisconnected: {
    emit: 'client:disconnectUser',
    on: 'server:disconnectUser',
  },
}
