'use client'
import React, {useEffect, useState} from 'react';
import styles from './Profile.module.scss';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import Image from "next/image";
import FormButton from "@/widgets/FormButton/FormButton";
import {useParams, useRouter} from "next/navigation";
import {pagesLinks} from "@/shared/constants/constants";
import UserService from "@/services/UserService";
import {IUser} from "@/shared/types/IUser";
import Loading from "@/app/(user)/loading";
import Link from "next/link";
import {log} from "node:util";
import {checkAuth, userInitialState} from "@/store/reducers/user.slice";

const NEXT_PUBLIC_API = process.env.NEXT_PUBLIC_API_URL;

const Profile = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    const params = useParams();
    const userStore = useAppSelector(store => store.user);
    const [user, setUser] = useState<IUser>(userInitialState.user);

    const setProfileData = async () => {
        const login = params.user;
        const { data } = await UserService.getUser(login);
        const user = UserService.setUserPath(data);
        setUser(user);
    }

    if (userStore.isLoading) {
        return <Loading />;
    }

    useEffect(() => {
        setProfileData();
    }, []);

    return (
        <div className={`contentBlock`}>
            {
                user.login
                ?
                <div className={styles.profileHeader}>
                    <div className={styles.infoBlock}>
                        <div className={styles.avatarBlock}>
                            <Image
                                src={user.avatar ? user.avatar : `${NEXT_PUBLIC_API}data/images/avatar.jpg`}
                                alt="Аватарка"
                                width='150'
                                height='150'
                            />
                        </div>
                        <div className={styles.textBlock}>
                            <div className={styles.nameBlock}>
                                <span>{user.surname}</span>
                                <span>{user.name}</span>
                                <span>{user.patronymic}</span>
                            </div>
                            <div className={styles.subInfoBlock}>
                                <div className={styles.subInfoSection}>
                                    <span className={styles.subInfoHeader}>Дата рождения: </span>
                                    <span className={styles.subInfoValue}>{user.dateBirth}</span>
                                </div>
                                <div className={styles.subInfoSection}>
                                    <span className={styles.subInfoHeader}>Номер телефона: </span>
                                    <span className={styles.subInfoValue}>{user.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                    user.login === userStore.user.login
                        ?
                        <div className={styles.btnsBlock}>
                            <Link href={pagesLinks.edit} className={styles.editBtn}>Редактировать профиль</Link>
                        </div>
                        :
                        <div className={styles.btnsBlock}>
                            <FormButton className={styles.editBtn}>Добавить в друзья</FormButton>
                            <FormButton className={styles.editBtn}>Написать сообщение</FormButton>
                        </div>
                    }
                </div>
                :
                ''
            }

        </div>
    )
};

export default Profile;