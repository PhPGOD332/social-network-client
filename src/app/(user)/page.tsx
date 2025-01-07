'use client'
import React, {useEffect} from 'react';
import {useStore} from "react-redux";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import LoginPage from "@/app/(user)/login/page";
import {checkAuth, logout} from "@/store/reducers/user.slice";
import {useRouter} from "next/navigation";
import {pagesLinks} from "@/shared/constants/constants";
import FormButton from "@/widgets/FormButton/FormButton";

const HomePage = () => {
    const store = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem("token")) {

            dispatch(checkAuth());
            console.log(store.isAuth);
        }
    }, []);

    if (!store.isLoading && !store.isAuth) {
        return <LoginPage />
    }

    if (store.isLoading) {
        return 'Загрузка...';
    }

    return (
        <div>
            <FormButton onClick={() => dispatch(logout())}>Выйти</FormButton>
        </div>
    );
};

export default HomePage;