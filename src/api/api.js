import axios from "axios";

const api = axios.create({
  baseURL: "https://skill-task-backend-production.up.railway.app/api",
});

export default api;
