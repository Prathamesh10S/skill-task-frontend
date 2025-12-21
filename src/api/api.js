import axios from "axios";

const api = axios.create({
  baseURL: "https://skill-task-backend-production.up.railway.app/api",
});

// 🔐 Attach ADMIN key automatically (if present)
api.interceptors.request.use((config) => {
  const adminKey = localStorage.getItem("ADMIN_KEY");

  if (adminKey) {
    config.headers["X-ADMIN-KEY"] = adminKey;
  }

  return config;
});

export default api;
