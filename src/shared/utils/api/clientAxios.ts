import axios, { AxiosRequestHeaders } from "axios";
import { getAuthToken } from "../storage/auth";

const API_URL = process.env.REACT_APP_API_URL;

const token = getAuthToken();

export const axiosClient = (useToken: boolean) => {
  const customHeaders: AxiosRequestHeaders = useToken
    ? { "Content-type": "application/json" }
    : {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      };

  const client = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: customHeaders,
  });
  return client;
};
