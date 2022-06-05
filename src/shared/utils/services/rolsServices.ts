import { IRolsForm } from "../../../pages/DocumentManagement/Rols/types/types";
import { axiosClient } from "../api/clientAxios";

const api = axiosClient(false).getUri();

const urlApi = `${api}/api/v1/rol`;

export const getRols = async () => {
  return await axiosClient(true).get(urlApi);
};

export const getRolByID = async (id: string) => {
  return await axiosClient(true).get(`${urlApi}/${id}`);
};

export const createRol = async (rol: IRolsForm) => {
  return await axiosClient(true).post(urlApi, process);
};

export const updateRol = async (id: string, Rol: IRolsForm) => {
  return await axiosClient(true).put(`${urlApi}/${id}`, process);
};

