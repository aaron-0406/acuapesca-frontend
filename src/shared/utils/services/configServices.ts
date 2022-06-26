import axiosClient from '../api/clientAxios'

const api = axiosClient.getUri()

const urlApi = `${api}/api/v1/config`

export const getPhotoProcess = async () => {
  return await axiosClient.get(`${urlApi}/photoProcess`)
}

export const updatePhotoProcess = async (document: FormData) => {
  return await axiosClient.post(`${urlApi}/photoProcess`, document, { headers: { 'Content-Type': 'multipart/form-data' } })
}
