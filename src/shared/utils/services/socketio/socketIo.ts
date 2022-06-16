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
};
