import { IDocumentForm } from '../../../pages/DocumentManagement/Documentary/types/types'
import axiosClient from '../api/clientAxios'

const api = axiosClient.getUri()

const urlApi = `${api}/api/v1/document`

export const getDocuments = async (id: number) => {
  return await axiosClient.get(`${urlApi}/${id}`)
}

export const getDocumentByCode = async (code: string, procedureId: number) => {
  return await axiosClient.get(`${urlApi}/single/${code}/${procedureId}`)
}

export const createDocument = async (document: FormData) => {
  return await axiosClient.post(urlApi, document, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const updateDocument = async (id: number, document: FormData) => {
  return await axiosClient.put(`${urlApi}/${id}`, document, { headers: { 'Content-Type': 'multipart/form-data' } })
}
