import axios from "axios";
import jwtDecode from "jwt-decode";
import { getAuthToken } from "../storage/auth";

const API_URL = process.env.REACT_APP_API_URL;

const request = axios.create({ baseURL: API_URL });

request.interceptors.request.use(async (config: any) => {
  const token = getAuthToken();
  if (token) {
    const user = jwtDecode<any>(token);
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    //checking for time expiration of the token
    if (secondsSinceEpoch > parseInt(user.exp + "")) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
      return;
    }
  }
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});

request.interceptors.response.use(async (response: any) => {
  return response;
});

export default request;

