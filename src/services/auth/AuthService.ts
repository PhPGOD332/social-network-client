import {AxiosResponse} from "axios";
import {AuthResponse} from "@/shared/types/response/AuthResponse";
import $api from "@/http";
import {IRegistration} from "@/store/reducers/user.slice";


const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class AuthService {
    static async login(
        login: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>("/login", { login, password });
    }

    static async registration(
        regData: IRegistration
    ): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post<AuthResponse>("/registration", regData);
    }

    static async logout(): Promise<void> {
        return await $api.post("/logout");
    }

    static async refresh() {
        return await $api.get<AuthResponse>(`${NEXT_PUBLIC_API_URL}/refresh`, {
            withCredentials: true,
        })
    }
}