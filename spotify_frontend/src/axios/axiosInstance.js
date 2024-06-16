import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 403) {
            localStorage.removeItem("token");
        }

        return Promise.reject(error)
    }
);

export default axiosInstance;