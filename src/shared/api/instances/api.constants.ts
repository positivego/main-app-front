import { useAppStore } from "@/shared/app";
import axios from "axios";

export const API_MAIN_URL = "https://localhost:3000";
export const API_DEV_URL = "http://localhost:3000";

export const API = axios.create({
  baseURL: import.meta.env.DEV ? API_DEV_URL : API_MAIN_URL,
  validateStatus(status) {
    return status >= 200 && status <= 300;
  },
});

API.interceptors.request.use((config) => {
  const store = useAppStore();
  if (store?.tokents?.refreshToken) {
    config.headers.Authorization = `Bearer ${store.tokents.refreshToken}`;
  }
  return config;
});
