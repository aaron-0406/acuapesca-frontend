import { IAdmin } from "../../shared/types";
import { axiosClient } from "../../shared/utils/api/clientAxios";
import { endpoints } from "../../shared/utils/api/endpoints";

export type TokenResponseType = {
  token: string;
  user: IAdmin;
  success: string;
  error: string;
};

interface ILogInRequest {
  email: string;
  password: string;
}

const api = axiosClient(false).getUri();

const urlApi = `${api}${endpoints.auth.signIn}`;

export const logIn = async ({ email, password }: ILogInRequest) => {
  return await axiosClient(false).post(urlApi, { email, password });
};
