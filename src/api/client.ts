import axios from "axios";

const API_ADDR =
  "https://raw.githubusercontent.com/ksks2211/data/refs/heads/main/json";

const apiClient = axios.create({
  baseURL: API_ADDR,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
