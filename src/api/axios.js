import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 2000,
});

API.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        if (error.request.status === 403) {
            console.error("No Privilege");
        }
        return Promise.reject(error);
    }
);

export default API;
