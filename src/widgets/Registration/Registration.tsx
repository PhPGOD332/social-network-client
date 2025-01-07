'use client'
import React, {useState} from 'react';
import styles from "./Registration.module.scss";
import FormButton from "@/widgets/FormButton/FormButton";
import Link from "next/link";
import {pagesLinks} from "@/shared/constants/constants";
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {useRouter} from "next/navigation";
import {IError} from "@/shared/types/IError/IError";
import {login, registration} from "@/store/reducers/user.slice";

interface TInputs {
    login: string;
    phone: string;
    password: string;
    passwordRepeat: string;
    surname: string;
    name: string;
    patronymic: string;
}

const Registration = () => {
    const { register, handleSubmit, getValues } = useForm<TInputs>();
    const store = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [error, setError] = useState<IError>({isError: false, value: ''});

    const submitForm = async (data?: TInputs) => {
        if (data)
            await onSubmit(data);
    }

    const onSubmit = async (data: TInputs) => {
        const response = await dispatch(
            registration({
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
            <h1 className={styles.header}>Регистрация</h1>
            <input
                type="text"
                className={styles.input}
                placeholder="Логин"
                {...register("login", {
                    required: "Введите ваш логин"
                })}
            />
            <input
                type="tel"
                className={styles.input}
                placeholder="Телефон"
                {...register("phone", {
                    required: "Введите ваш телефон"
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
            <input
                type="password"
                className={styles.input}
                placeholder="Повторите пароль"
                {...register("password", {
                    required: "Повторите ваш пароль"
                })}
            />
            <FormButton type="submit">Войти</FormButton>
            <span className={styles.error}>{error.value && ''}</span>
            <Link className={styles.link} href={pagesLinks.login} type="button">
                Войти
            </Link>
        </form>
    );
};

export default Registration;