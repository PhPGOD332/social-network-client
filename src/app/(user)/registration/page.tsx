import React from 'react';
import styles from "./RegistrationPage.module.scss";
import Registration from "@/widgets/Registration/Registration";
const RegistrationPage = () => {
    return (
        <div className={styles.authPage}>
            <Registration />
        </div>
    );
};

export default RegistrationPage;