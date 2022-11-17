import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BUS_GATEWAY,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default apiClient;