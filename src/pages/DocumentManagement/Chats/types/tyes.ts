export interface IContact {
  id?: number;
  fullname: string;
  photo: string;
  messages: IMessage[];
  typing?: boolean;
}

export interface ChatContext {
  contacts: IContact[];
  setContacts: Function;
  contact: IContact;
  setContact: Function;
  sendMessage: Function;
  typing: Function;
  contactTyping: IContactStatus[];
  setContactTyping: Function;
  typingState: boolean;
  setTypingState: Function;
  onlineState: boolean;
  setOnlineState: Function;
}

export interface IContactStatus {
  id: number;
  typing: boolean;
  online: boolean;
}

export interface IMessage {
  id?: string;
  id_receptor: number;
  id_emisor: number;
  text: string;
  status: number;
  date: string;
}
