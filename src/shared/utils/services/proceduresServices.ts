import { IProceduresForm } from "../../../pages/DocumentManagement/Documentary/types/types";
import { axiosClient } from "../api/clientAxios";

const api = axiosClient(false).getUri();

const urlApi = `${api}/api/v1/procedimiento`;

export const getProcedures = async (id: number) => {
  return await axiosClient(true).get(`${urlApi}/${id}`);
};

export const getProcedureByID = async (id: number) => {
  return await axiosClient(true).get(`${urlApi}/single${id}`);
};

export const createProcedure = async (procedure: IProceduresForm) => {
  return await axiosClient(true).post(urlApi, procedure);
};

export const updateProcedure = async (
  id: number,
  procedure: IProceduresForm
) => {
  return await axiosClient(true).put(`${urlApi}/${id}`, procedure);
};
