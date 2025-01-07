import React from 'react';
import styles from '@/widgets/Input/Input.module.scss';
import {TInput} from "@/shared/types/UI/UI";

const Input = ({ type, placeholder }: TInput) => {
    return (
        <input
            type={ type }
            placeholder={ placeholder }
            className={ styles.input }
        />
    );
};

export default Input;