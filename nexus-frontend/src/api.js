import axios from "axios";
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use(
  (config) => {
      const token = sessionStorage.getItem('authToken');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      
      Swal.fire({
        title: "Sessão expirada",
        text: "Sua sessão expirou. Por favor, realize o login novamente",
        icon: "info",
        timer: 10000,  
        timerProgressBar: true,  
        willClose: () => {
          window.location.href = '/login';
        }
      });
    }

    return Promise.reject(error);
  }
);

export default api;
