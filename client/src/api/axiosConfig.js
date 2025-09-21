import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // backend
});

// Attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`);
  return config;
});

API.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`API Error: ${error.response?.status} - ${error.message}`);
    return Promise.reject(error);
  }
);

export default API;
