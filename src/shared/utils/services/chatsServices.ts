import axiosClient from "../api/clientAxios";
const api = axiosClient.getUri();

const urlApi = `${api}/api/v1/chat`;

export const getContacts = async () => {
  return await axiosClient.get(`${urlApi}/contacts`);
};


