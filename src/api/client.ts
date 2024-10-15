import axios from "axios";

// const API_ADDR =
//   "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/json";
const apiUrl = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
