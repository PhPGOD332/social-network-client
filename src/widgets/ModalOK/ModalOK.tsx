import React, {useRef, useState} from 'react';
import styles from './ModalOK.module.scss';
import FormButton from "@/widgets/FormButton/FormButton";
import {ButtonTypes} from "@/shared/types/UI/UI";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    children?: string;
}

const ModalOk = ({ isOpen, setIsOpen, children }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const modalButtonRef = useRef<HTMLDivElement>(null);

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div
            className={`${isOpen ? styles.modalWrapper : styles.modalWrapperHidden}`}
            onClick={closeModal}
            ref={modalRef}
        >
            <div className={styles.modalBlock}>
                <div className={styles.modalTextBlock}>
                    { children }
                </div>
                <div className={styles.modalButtonsBlock}>
                    <FormButton
                        onClick={closeModal}
                        className={styles.buttonConfirm}
                    >
                        ОК
                    </FormButton>
                </div>
            </div>
        </div>
    );
};

export default ModalOk;