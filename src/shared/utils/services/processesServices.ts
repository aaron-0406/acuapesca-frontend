import { IProcessesForm } from "../../../pages/DocumentManagement/Documentary/types/types";
import axiosClient from "../api/clientAxios";

const api = axiosClient.getUri();

const urlApi = `${api}/api/v1/proceso`;

export const getProcesses = async () => {
  return await axiosClient.get(urlApi);
};

export const getProcessByID = async (id: number) => {
  return await axiosClient.get(`${urlApi}/${id}`);
};

export const createProcess = async (process: IProcessesForm) => {
  return await axiosClient.post(urlApi, process);
};

export const updateProcess = async (id: number, process: IProcessesForm) => {
  return await axiosClient.put(`${urlApi}/${id}`, process);
};

export const changeProcessStatus = async (id: number, status: boolean) => {
  return await axiosClient.patch(`${urlApi}/${id}`, { status });
};
