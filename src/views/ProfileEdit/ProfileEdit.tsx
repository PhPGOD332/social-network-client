'use client'
import React, {ChangeEvent, useEffect, useState} from 'react';
import {IError} from "@/shared/types/IError/IError";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import styles from "./ProfileEdit.module.scss";
import {useRouter} from "next/navigation";
import FormButton from "@/widgets/FormButton/FormButton";
import {IUser} from "@/shared/types/IUser";
import {editUser} from "@/store/reducers/user.slice";
import UserService from "@/services/UserService";
import Loading from "@/app/(user)/loading";
import Image from "next/image";
import {ButtonTypes} from "@/shared/types/UI/UI";
import ModalOk from "@/widgets/ModalOK/ModalOK";

interface TInputs {
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    dateBirth: string;
    avatar: string;
    password?: string;
}

const ProfileEdit = () => {
    const userStore = useAppSelector(store => store.user);

    const [userData, setUserData] = useState<IUser>(null);
    const [isError, setIsError] = useState<IError>({
        isError: false,
        value: '',
    });
    const [isOpenModal, setIsOpenModal] = useState(false);

    // const { register, handleSubmit } = useForm<TInputs>();
    // const dispatch = useAppDispatch();
    const router = useRouter();


    if (userStore.isLoading) {
        return <Loading />;
    }

    const setProfileData = async () => {
        const { data } = await UserService.getUser(userStore.user.login);
        const user = UserService.setUserPath(data);

        setUserData(user);
    }

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, dateBirth: e.target.value});
    }

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUserData({...userData, avatar: URL.createObjectURL(e.target.files[0]), avatarFile: e.target.files[0]});
        }
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, name: e.target.value})
    }

    const handleSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, surname: e.target.value})
    }

    const handlePatronymicChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, patronymic: e.target.value})
    }

    useEffect(() => {
        setProfileData();
    }, []);

    const submitForm = async (data?: TInputs) => {
        if (data)
            await onSubmit(data);
    }

    const onSubmit = async (data: TInputs) => {
        let user = { ...userData, ...data };
        // const response = await dispatch(
        //     editUser(
        //         user
        //     )
        // );
        const formData = new FormData();
        formData.append('avatarFile', user.avatarFile);
        formData.append('name', user.name);
        formData.append('surname', user.surname);
        formData.append('patronymic', user.patronymic);
        formData.append('dateBirth', user.dateBirth);

        const response = await UserService.editUser(formData);

        console.log(response);

        if (!response.data) {
            setIsError({
                isError: true,
                value: 'Произошла ошибка'
            })
        } else {
            setIsError({
                isError: false,
                value: ''
            })
        }

        setIsOpenModal(true);
    }

    return (
        <div className={'contentBlock'}>
            <ModalOk
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
            >
                { isError ? isError.value : 'Профиль успешно сохранен' }
            </ModalOk>
            <div className={styles.headerBlock}>
                <FormButton onClick={router.back}>Назад</FormButton>
                <h2 className={styles.header}>Редактирование профиля</h2>
            </div>
            {
            userData
            ?
                <form className={styles.formBlock} onSubmit={() => submitForm()}>
                    <div className={styles.avatarBlock}>
                        <label htmlFor="">
                            Аватар:
                            <div className={styles.avatar}>
                                <Image
                                    src={userData.avatar}
                                    alt="Аватар"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <input
                                className={styles.inputFile}
                                onInput={handleAvatarChange}
                                type="file"
                                accept="image/*"
                            />
                        </label>
                    </div>
                    <label htmlFor="">
                        Фамилия:
                        <input
                            type="text"
                            className={styles.input}
                            value={userData.surname}
                            onInput={handleSurnameChange}
                        />
                    </label>
                    <label htmlFor="">
                        Имя:
                        <input
                            type="text"
                            className={styles.input}
                            value={userData.name}
                            onInput={handleNameChange}
                        />
                    </label>
                    <label htmlFor="">
                        Отчество:
                        <input
                            type="text"
                            className={styles.input}
                            value={userData.patronymic}
                            onInput={handlePatronymicChange}
                        />
                    </label>
                    <label htmlFor="">
                        Дата рождения:
                        <input
                            type="date"
                            className={styles.input}
                            value={userData.dateBirth}
                            onInput={handleDateChange}
                        />
                    </label>
                    <FormButton
                        onClick={() => submitForm(userData)}
                    >
                        Сохранить
                    </FormButton>
                </form>
                :
                ''
            }
        </div>
    );
};

export default ProfileEdit;