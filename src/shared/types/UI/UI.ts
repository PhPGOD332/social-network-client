import React from "react";

enum InputTypes {
    text = "text",
    password = "password",
    email = "email",
}

export enum ButtonTypes {
    button = "button",
    reset = "reset",
    submit = "submit",
}

export interface TButton {
    children?: string;
    onClick?: (e?: React.MouseEvent<any>) => void;
    type?: ButtonTypes;
    className?: string;
}

export interface TInput {
    type: InputTypes,
    placeholder?: string,
    label?: string,
}