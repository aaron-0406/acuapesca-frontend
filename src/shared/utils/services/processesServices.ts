import { IProcessesForm } from "../../../pages/DocumentManagement/Documentary/types/types";
import { axiosClient } from "../api/clientAxios";

const api = axiosClient(false).getUri();

const urlApi = `${api}/api/v1/proceso`;

export const getProcesses = async () => {
  return await axiosClient(true).get(urlApi);
};

export const getProcessByID = async (id: string) => {
  return await axiosClient(true).get(`${urlApi}/${id}`);
};

export const createProcess = async (process: IProcessesForm) => {
  return await axiosClient(true).post(urlApi, process);
};

export const updateProcess = async (process: IProcessesForm) => {
  return await axiosClient(true).put(urlApi, process);
};

export const changeProcessStatus = async (status: boolean) => {
  return await axiosClient(true).patch(urlApi, { status });
};
