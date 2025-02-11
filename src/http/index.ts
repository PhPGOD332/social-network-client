import axios from "axios";
import {AuthResponse} from "@/shared/types/response/AuthResponse";


const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const $api = axios.create({
    withCredentials: true,
    baseURL: `${NEXT_PUBLIC_API_URL}`,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if(
            error.response.status == 401 &&
            originalRequest &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.get<AuthResponse>(
                    `${NEXT_PUBLIC_API_URL}/refresh`,
                    { withCredentials: true },
                );
                localStorage.setItem("token", response.data.accessToken);
                return $api.request(originalRequest);
            } catch (e) {
                console.log("НЕ АВТОРИЗОВАН");
            }
        }
        throw error;
    },
);

export default $api;