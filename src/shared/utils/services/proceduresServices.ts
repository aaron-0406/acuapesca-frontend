import { IProceduresForm } from "../../../pages/DocumentManagement/Documentary/types/types";
import axiosClient from "../api/clientAxios";

const api = axiosClient.getUri();

const urlApi = `${api}/api/v1/procedimiento`;

export const getProcedures = async (id: number) => {
  return await axiosClient.get(`${urlApi}/${id}`);
};

export const getProcedureByID = async (id: number) => {
  return await axiosClient.get(`${urlApi}/single${id}`);
};

export const createProcedure = async (procedure: IProceduresForm) => {
  return await axiosClient.post(urlApi, procedure);
};

export const updateProcedure = async (id: number, procedure: IProceduresForm) => {
  return await axiosClient.put(`${urlApi}/${id}`, procedure);
};
