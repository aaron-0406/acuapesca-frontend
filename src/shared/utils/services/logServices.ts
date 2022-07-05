import { config } from 'process'
import axiosClient from '../api/clientAxios'

const api = axiosClient.getUri()

const urlApi = `${api}/api/v1/log`

export const getLogsService = async (idUser: number) => {
  return await axiosClient.get(`${urlApi}/${idUser}`)
}

export const createLogService = async (documento_id: string) => {
  return await axiosClient.post(urlApi, { documento_id: documento_id })
}
