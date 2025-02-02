'use client'
import React from 'react';
import Link from "next/link";
import {logout} from "@/store/reducers/user.slice";
import FormButton from "@/widgets/FormButton/FormButton";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {pagesLinks} from "@/shared/constants/constants";
import styles from "./SideNavigation.module.scss";

const SideNavigation = () => {
    const userStore = useAppSelector(store => store.user);
    const dispatch = useAppDispatch();

    return (
        <nav className={styles.navigation}>
            <span className={styles.name}>{ userStore.user.name ? `Привет, ${userStore.user.name}!` : '' }</span>
            <div className={styles.linkBlock}>
                <Link className={styles.link} href={`/${userStore.user.login}`}>Профиль</Link>
                <Link className={styles.link} href={pagesLinks.profile}>Сообщения</Link>
                <Link className={styles.link} href={pagesLinks.profile}>Друзья</Link>
                <Link className={styles.link} href={pagesLinks.profile}>Профиль</Link>
            </div>
            <FormButton className={styles.exitButton} onClick={() => dispatch(logout())}>Выйти</FormButton>
        </nav>
    );
};

export default SideNavigation;