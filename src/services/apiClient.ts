import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BUS_GATEWAY,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'digitransit-subscription-key': '3adea1f883ef43f8a0b7e3d1aa3684d0'
  }
});

export default apiClient;