import {UserRoles} from "@/shared/types/UserRoles";

export interface IUser {
    _id: string;
    login: string;
    email: string;
    phone: string;
    surname: string;
    name: string;
    patronymic: string;
    avatar: string;
    dateBirth: Date | null;
    isActivated: boolean;
    role: {
        value: UserRoles,
        label: string,
    },
    activationLink: string;
}