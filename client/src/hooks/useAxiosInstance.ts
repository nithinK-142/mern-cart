import axios from "axios";
import { useGetToken } from "./useGetToken";

export const useAxiosInstance = () => {
  const { headers } = useGetToken();

  const axiosUserInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/user`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    withCredentials: true,
  });

  const axiosProductInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/product`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    withCredentials: true,
  });

  return { axiosUserInstance, axiosProductInstance };
};
