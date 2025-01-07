import {UserRoles} from "@/shared/types/UserRoles";

export interface IUser {
    _id: string;
    login: string;
    email: string;
    phone: string;
    isActivated: boolean;
    role: {
        value: UserRoles,
        label: string,
    },
    activationLink: string;
}