import { Component } from "react";
import { FormFieldState, SignUpThemeProps } from "../../../../types";
export default class SignUpTheme extends Component<SignUpThemeProps, {
    formFields: FormFieldState[];
}> {
    constructor(props: SignUpThemeProps);
    render(): JSX.Element;
}
