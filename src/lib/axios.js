import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.16.179:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

/* Optional: request interceptor */
api.interceptors.request.use(
  (config) => {
    // Example: attach token if needed
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

/* Optional: response interceptor */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;