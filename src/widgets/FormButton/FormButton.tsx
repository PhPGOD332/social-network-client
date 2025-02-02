import React from 'react';
import styles from './FormButton.module.scss';
import {ButtonTypes, TButton} from "@/shared/types/UI/UI";

const FormButton = ({ children, onClick, type = ButtonTypes.button, className }: TButton) => {
    return (
        <button
            type={ type }
            className={`${className} ${styles.greenButton}`}
            onClick={typeof onClick === "function" ? onClick : null}
        >
            { children }
        </button>
    );
};

export default FormButton;