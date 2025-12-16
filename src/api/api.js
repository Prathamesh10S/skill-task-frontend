import axios from "axios";

const api = axios.create({
//   baseURL: "https://skill-task-backend-production.up.railway.app/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
