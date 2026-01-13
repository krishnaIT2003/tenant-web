import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

const axiosInstance: AxiosInstance = axios.create({});

const refreshAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to track if a refresh is in progress
let isRefreshing = false;
// Queue to hold failed requests
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

// Function to refresh the access token
const refreshAccessToken = async (): Promise<any> => {
  const url = "http://172.168.168.36:8004/token/refresh/";
  const { data } = await refreshAxios.post(url, {
    refresh: localStorage.getItem("refreshToken"),
  });
  return data;
};
// Function to process the queue of failed requests
const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error); // Reject the promise if there's an error
    } else {
      prom.resolve(token!); // Resolve the promise with the new token
    }
  });
  window.location.reload();
  failedQueue = []; // Clear the queue
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      (error?.response?.data?.message === "Invalid or Missing Access-Token" ||
        error?.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const tokens = await refreshAccessToken();
          const newAccessToken = tokens?.access;
          const newRefreshToken = tokens?.refresh;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          axiosInstance.defaults.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return axiosInstance(originalRequest);
        } catch (refreshError: any) {
          processQueue(refreshError as AxiosError, null);
          localStorage.clear();
          window.location.href = "/login";
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token: string) => {
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
        }
        return axiosInstance(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export { axiosInstance as axios };
