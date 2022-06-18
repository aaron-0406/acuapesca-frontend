import { io, Socket } from "socket.io-client";
import { API } from "../../constant/api";
import { getAuthToken } from "../../storage/auth";

const auth_token = getAuthToken();
export const socket: Socket = io(API, {
  auth: {
    token: auth_token,
  },
  extraHeaders: { Authorization: `Bearer ${auth_token}` },
});
export const socketsRoutes = {
  sendMessage: {
    emit: "client:sendMessage",
    on: "server:sendMessage",
  },
  changeChannel: {
    emit: "client:changeChat",
  },
  view: {
    emit: "client:viewMessage",
    on: "server:viewMessage",
  },
  received: {
    emit: "server:receivedMessage",
    on: "client:receivedMessage",
  },
  typing: {
    emit: "client:typing",
    on: "server:typing",
  },
  newUserConnected: {
    emit: "client:sendUsers",
    on: "server:sendUsers",
  },
  userDisconnected: {
    emit: "client:disconnectUser",
    on: "server:disconnectUser",
  },
};
