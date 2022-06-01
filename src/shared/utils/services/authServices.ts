import { axiosClient } from "../api/clientAxios";

const api = axiosClient(false).getUri();

const urlApi = `${api}/api/v1/auth/signin`;

export const signIn = async (email: string, password: string) => {
  return await axiosClient(true).post(urlApi, { email, password });
};
