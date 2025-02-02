import {ButtonTypes, TButton} from "@/shared/types/UI/UI";
import styles from "@/widgets/FormButton/FormButton.module.scss";
import React from "react";

const ModalButton = ({ children, onClick, type = ButtonTypes.button, className }: TButton) => {
    return (
        <button
            type={ type }
            className={`${className} ${styles.greenButton}`}
            onClick={onClick}
        >
            { children }
        </button>
    );
};

export default ModalButton;