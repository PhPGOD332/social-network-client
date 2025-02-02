import {IUser} from "@/shared/types/IUser";
import $api from "@/http";
import {AxiosResponse} from "axios";
import {UserResponse} from "@/shared/types/response/UserResponse";

const NEXT_PUBLIC_API = process.env.NEXT_PUBLIC_API_URL || "";

class UserService {
    static setUserPath(user: IUser) {
        return user.avatar ? { ...user, avatar: `${NEXT_PUBLIC_API}data/images/${user._id}/${user.avatar}` } : user;
    }

    static async getUser(login: string | Array<string>): Promise<AxiosResponse<IUser>> {
        return await $api.get<IUser>(`/users/${login}`);
    }

    static async editUser(formData: object): Promise<AxiosResponse<UserResponse>> {
        // const data = {...userData, avatarFile: formData};

        return await $api.post<UserResponse>(
            `users/edit`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    }
}

export default UserService;