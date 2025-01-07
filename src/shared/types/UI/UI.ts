
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
    onClick?: () => void;
    type?: ButtonTypes;
}

export interface TInput {
    type: InputTypes,
    placeholder?: string,
    label?: string,
}