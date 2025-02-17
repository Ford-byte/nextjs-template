import axios from "axios";
import rateLimit from "axios-rate-limit";

const apiClient = rateLimit(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }),
  {
    maxRequests: 10,
    perMilliseconds: 1000,
    maxRPS: 10,
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;
