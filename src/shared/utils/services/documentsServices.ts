import { IDocumentForm } from "../../../pages/DocumentManagement/Documentary/types/types";
import axiosClient from "../api/clientAxios";

const api = axiosClient.getUri();

const urlApi = `${api}/api/v1/document`;

export const getDocuments = async (id: number) => {
  return await axiosClient.get(`${urlApi}/${id}`);
};

export const getDocumentByID = async (id: number) => {
  return await axiosClient.get(`${urlApi}/single${id}`);
};

export const createDocument = async (procedure: IDocumentForm) => {
  return await axiosClient.post(urlApi, procedure);
};

export const updateDocument = async (
  id: number | undefined,
  procedure: IDocumentForm
) => {
  return await axiosClient.put(`${urlApi}/${id}`, procedure);
};
