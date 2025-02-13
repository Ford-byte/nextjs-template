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
    maxRequests: 10, // Max number of requests
    perMilliseconds: 1000, // Time frame (1 second)
    maxRPS: 10, // Max requests per second
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiClient;
