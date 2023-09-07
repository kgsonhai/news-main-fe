import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const generateToken = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const makeUrl = (endpoint) => {
  return `http://localhost:8080${endpoint}`;
};

axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;
    if (status === 403 && message === "Invalid jwt token") {
      console.log("Expire");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "http://localhost:3000";
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  const newConfig = {
    ...config,
  };

  newConfig.headers = {
    ...newConfig.headers,
    ...(localStorage.getItem("token") && generateToken()),
  };

  if (newConfig.headers["Content-Type"] === "multipart/form-data")
    return newConfig;

  return newConfig;
});

export const client = {
  get: async (endPoint, config) => {
    return axios.get(makeUrl(endPoint), config);
  },

  post: async (endPoint, data, config) => {
    return axios.post(makeUrl(endPoint), data, config);
  },

  put: async (endPoint, data, config) => {
    return axios.put(makeUrl(endPoint), data, config);
  },

  patch: async (endPoint, data, config) => {
    return axios.patch(makeUrl(endPoint), data, config);
  },

  delete: async (endPoint, config) => {
    return axios.delete(makeUrl(endPoint), config);
  },
};
