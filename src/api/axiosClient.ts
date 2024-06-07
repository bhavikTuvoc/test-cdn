import axios from "axios";

let baseUrl: string = import.meta.env.VITE_BASE_URL;

const axiosClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

// Request interceptor for API calls
axiosClient.interceptors.request.use(
  async (config) => {
    // Conditionally set Content-Type to 'application/json' if not FormData
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const response = await axiosClient.post(`${baseUrl}/token/refresh/`);
      if (response.status === 200) {
        return axiosClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
