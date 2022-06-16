import { ChatContext, IContact, IMessage } from "../types/tyes";
import React, { useEffect, useState } from "react";
import { getContacts } from "../../../../shared/utils/services/chatsServices";
import { socket, socketsRoutes } from "../../../../shared/utils/services/socketio/socketIo";

export const ChatCxt = React.createContext({} as ChatContext);

export const ChatProvider = ({ children }: { children: JSX.Element }) => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [contact, setContact] = useState<IContact>({ fullname: "", photo: "", messages: [] });

  const getContactsData = async () => {
    const res = await getContacts();
    const { data } = res;
    const { success, error, users } = data;

    if (success) setContacts(users);
    if (error) setContacts([]);
  };

  useEffect(() => {
    getContactsData();
    return () => setContacts([]);
  }, []);

  useEffect(() => {
    socket.on(socketsRoutes.sendMessage.on, getMessage);
    return () => {
      socket.off(socketsRoutes.sendMessage.on, getMessage);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, contacts, contact]);

  const getMessage = (message: IMessage) => {
    if (message.id_emisor === contact.id) {
      const { messages } = contact;
      const newMessages = [...messages, message];
      setContact({ ...contact, messages: newMessages });
    }
    setContacts(
      contacts.map((contactItem: IContact) => {
        if (contactItem.id === message.id_emisor) {
          contactItem.messages = [...contactItem.messages, message];
          return contactItem;
        }
        return contactItem;
      })
    );
  };

  const sendMessage = (message: IMessage) => {
    const { messages } = contact;
    const newMessages = [...messages, message];
    setContact({ ...contact, messages: newMessages });
    setContacts(
      contacts.map((contactItem: IContact) => {
        if (contactItem.id === message.id_receptor) {
          contactItem.messages = [...contactItem.messages, message];
          return contactItem;
        }
        return contactItem;
      })
    );
    socket.emit(socketsRoutes.sendMessage.emit, message);
  };

  return (
    <ChatCxt.Provider
      value={{
        contacts,
        setContacts,
        contact,
        setContact,
        sendMessage,
      }}
    >
      {children}
    </ChatCxt.Provider>
  );
};
