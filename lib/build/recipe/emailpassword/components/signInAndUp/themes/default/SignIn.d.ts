import { Component } from "react";
import { SignInThemeProps, FormFieldState } from "../../../../types";
export default class SignInTheme extends Component<SignInThemeProps, {
    formFields: FormFieldState[];
}> {
    constructor(props: SignInThemeProps);
    render(): JSX.Element;
}
