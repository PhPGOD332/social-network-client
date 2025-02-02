'use client'
import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/store/hooks";
import {pagesLinks} from "@/shared/constants/constants";

const HomePage = () => {
    const store = useAppSelector(store => store.user);
    const router = useRouter();

    useEffect(() => {
        if (!store.isLoading && !store.isAuth) {
            router.push(`/${store.user.login}`);
        }

        router.push(`${store.user.login}`);
    }, []);
};

export default HomePage;