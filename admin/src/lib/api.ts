import axios from 'axios';

const api = axios.create({
  baseURL: '/api/admin',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('hibiscus_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 411) {
      sessionStorage.removeItem('hibiscus_admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
