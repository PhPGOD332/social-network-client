import {IUser} from "@/shared/types/IUser";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}