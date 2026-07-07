import axios from 'axios';

export const createAxiosClient = ({
  baseURL,
  headers = {},
  token,
  interceptResponses = false,
}) => {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  // Add auth token to requests if provided
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Optional: Add response interceptors if needed
  if (interceptResponses) {
    client.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error)
    );
  }

  return client;
};
