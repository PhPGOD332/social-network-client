'use client'
import React, {useState} from 'react';
import styles from './Authorization.module.scss';
import FormButton from "@/widgets/FormButton/FormButton";
import {useAppDispatch} from "@/store/hooks";
import {login} from "@/store/reducers/user.slice";
import {IError} from "@/shared/types/IError/IError";
import {useRouter} from "next/navigation";
import {pagesLinks} from "@/shared/constants/constants";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {ButtonTypes} from "@/shared/types/UI/UI";

interface TInputs {
    login: string;
    password: string;
}

const Authorization = () => {
    const { register, handleSubmit, getValues } = useForm<TInputs>();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [error, setError] = useState<IError>({isError: false, value: ''});

    const submitForm = async (data?: TInputs) => {
        if (data)
            await onSubmit(data);
    }

    const onSubmit = async (data: TInputs) => {
        const response = await dispatch(
            login({
                login: data.login,
                password: data.password
            }),
        );

        if (!response.payload) {
            setError({
                isError: true,
                value: 'Неверные данные',
            });
        }

        if (response.payload) {
            setError({
                isError: false,
                value: ''
            });
            router.push(pagesLinks.main);
        }
    }

    return (
        <form className={styles.authBlock} onSubmit={handleSubmit(submitForm)}>
            <h1 className={styles.header}>Авторизация</h1>
            <input
                type="text"
                className={styles.input}
                placeholder="Логин"
                {...register("login", {
                    required: "Введите ваш логин"
                })}
            />
            <input
                type="password"
                className={styles.input}
                placeholder="Пароль"
                {...register("password", {
                    required: "Введите ваш пароль"
                })}
            />
            <FormButton type={ButtonTypes.submit}>Войти</FormButton>
            <span className={styles.error}>{error.value && ''}</span>
            <Link className={styles.link} href={pagesLinks.registration} type="button">
                Регистрация
            </Link>
        </form>
    );
};

export default Authorization;