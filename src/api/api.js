import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
