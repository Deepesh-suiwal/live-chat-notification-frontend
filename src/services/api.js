import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// 🔒 Refresh coordination
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(true);
    }
  });

  failedQueue = [];
};

// ============================
// RESPONSE INTERCEPTOR
// ============================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // ❌ Agar response hi nahi hai
    if (!error.response) {
      return Promise.reject(error);
    }

    // ❌ Agar 401 nahi hai
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // 🔁 Infinite loop guard
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // 🚫 Agar refresh endpoint fail ho
    if (originalRequest.url?.includes("/api/users/auth/refresh-token")) {
      return Promise.reject(error);
    }

    // ⏳ Agar refresh already chal raha hai
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // 🔄 Refresh token call
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/auth/refresh-token`,
        {},
        { withCredentials: true },
      );

      processQueue(null);

      // 🔁 Retry original request
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
