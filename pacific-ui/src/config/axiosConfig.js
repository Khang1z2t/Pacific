import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Error:', error);
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.request.use(
    (config) => {
        console.log('Request:', config);
        return config;
    },
    (error) => {
        console.error('Error:', error);
        return Promise.reject(error);
    }
)

export default axiosInstance;

