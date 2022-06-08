import { IRolsForm } from "../../../pages/DocumentManagement/Rols/types/types";
import axiosClient from "../api/clientAxios";

const api = axiosClient.getUri();

const urlApi = `${api}/api/v1/rol`;

export const getRols = async () => {
  return await axiosClient.get(urlApi);
};

export const getRolByID = async (id: number) => {
  return await axiosClient.get(`${urlApi}/${id}`);
};

export const createRol = async (rol: IRolsForm) => {
  return await axiosClient.post(urlApi, rol);
};

export const updateRol = async (id: number, rol: IRolsForm) => {
  return await axiosClient.put(`${urlApi}/${id}`, rol);
};
