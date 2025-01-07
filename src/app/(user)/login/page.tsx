import React from 'react';
import Authorization from "@/widgets/Authorization/Authorization";
import styles from "./LoginPage.module.scss";

const LoginPage = () => {
    return (
        <div className={styles.authPage}>
            <Authorization />
        </div>
    );
};

export default LoginPage;