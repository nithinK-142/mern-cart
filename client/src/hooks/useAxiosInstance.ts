import axios from "axios";
import { useGetToken } from "./useGetToken";
import { jwtDecode } from "jwt-decode";

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

  axiosProductInstance.interceptors.request.use(
    async (config) => {
      const accessToken = headers.authorization;
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp!;
        const currentTime = Math.floor(Date.now() / 1000);

        if (expirationTime - currentTime <= 120) {
          try {
            console.log("Interceptor Called!");
            await refreshAccessToken();
            config.headers.Authorization = headers.authorization;
          } catch (error) {
            console.error("Failed to refresh access token:", error);
          }
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  async function refreshAccessToken() {
    try {
      await axiosUserInstance.post("/refresh");
    } catch (error) {
      console.error("Failed to refresh access token:", error);
    }
  }

  return { axiosUserInstance, axiosProductInstance };
};
