import {IUser} from "@/shared/types/IUser";

export interface UserResponse {
    user: IUser;
    error?: string;
}