import axios, { AxiosRequestHeaders } from "axios";
import { getAuthToken } from "../storage/auth";

const API_URL = process.env.REACT_APP_API_URL;

export const axiosClient = (useToken: boolean) => {
  const customHeaders: AxiosRequestHeaders = !useToken
    ? { "Content-type": "application/json" }
    : {
        "Content-type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      };

  const client = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: customHeaders,
  });
  return client;
};
