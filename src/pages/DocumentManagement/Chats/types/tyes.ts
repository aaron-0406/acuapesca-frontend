export interface IContact {
  id?: number;
  fullname: string;
  photo: string;
  messages: IMessage[];
}

export interface ChatContext {
  contacts: IContact[];
  setContacts: Function;
  contact: IContact;
  setContact: Function;
  sendMessage: Function;
}

export interface IMessage {
  id?: string;
  id_receptor: number;
  id_emisor: number;
  text: string;
  date: string;
}
