import { IUsersForm } from '../../../pages/DocumentManagement/Users/types/types'
import axiosClient from '../api/clientAxios'

const api = axiosClient.getUri()

const urlApi = `${api}/api/v1/user`

export const getUsers = async () => {
  return await axiosClient.get(urlApi)
}

export const getUserByID = async (id: number) => {
  const res = await axiosClient.get(`${urlApi}/${id}`)
  return res
}

export const createUser = async (user: IUsersForm) => {
  return await axiosClient.post(urlApi, user)
}

export const updateUser = async (id: number, user: IUsersForm) => {
  return await axiosClient.put(`${urlApi}/${id}`, user)
}

export const updateUserStatus = async (id: number, status: boolean) => {
  return await axiosClient.patch(`${urlApi}/status/${id}`, { status: status })
}

export const updateUserPhoto = async (photo: FormData) => {
  return await axiosClient.patch(`${urlApi}/photo`, photo, { headers: { 'Content-Type': 'multipart/form-data' } })
}
