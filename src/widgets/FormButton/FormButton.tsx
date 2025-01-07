import React from 'react';
import styles from './GreenButton.module.scss';
import {TButton} from "@/shared/types/UI/UI";

const PurpleButton = ({ children, onClick, type }: TButton) => {
    return (
        <button
            type={ type }
            className={styles.greenButton}
            onClick={() => typeof onClick === "function" ? onClick() : ''}
        >
            { children }
        </button>
    );
};

export default PurpleButton;