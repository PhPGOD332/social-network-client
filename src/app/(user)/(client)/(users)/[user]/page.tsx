import React from 'react';
import Profile from "@/views/Profile/Profile";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
    return (
        <div className={styles.contentLayout}>
            <Profile />
        </div>

    );
};

export default ProfilePage;