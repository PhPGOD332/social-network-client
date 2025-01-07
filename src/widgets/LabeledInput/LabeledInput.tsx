import React from 'react';
import Input from "@/widgets/Input/Input";
import {TInput} from "@/shared/types/UI/UI";

const LabeledInput = ({ type, placeholder, label }: TInput) => {
    return (
        <label >
            { label }
            <Input
                type={ type }
                placeholder={ placeholder }
            />
        </label>
    );
};

export default LabeledInput;