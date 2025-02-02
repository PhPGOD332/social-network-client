'use client'
import React, {useEffect} from "react";
import styles from "@/app/(user)/MainPage.module.scss";
import SideNavigation from "@/widgets/SideNavigation/SideNavigation";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {checkAuth} from "@/store/reducers/user.slice";
import LoginPage from "@/app/(user)/login/page";
import {useRouter} from "next/navigation";
import Loading from "@/app/(user)/loading";


export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const store = useAppSelector((store) => store.user);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("token")) {

            dispatch(checkAuth());
        }
    }, []);

    if (!store.isLoading && !store.isAuth) {
        return <LoginPage />
    }

    if (store.isLoading) {
        return <Loading />;
    }

    return (
        <div className="main">
            <div className="container">
                <SideNavigation/>
                <div className={styles.content}>
                    { children }
                </div>
            </div>
        </div>
    );
}