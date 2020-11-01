import { Component } from "react";
import { EnterEmailThemeProps, FormFieldState } from "../../../../types";
export default class EnterEmailTheme extends Component<EnterEmailThemeProps, {
    emailSent?: boolean;
    formFields: FormFieldState[];
}> {
    constructor(props: EnterEmailThemeProps);
    onSuccess: () => void;
    resend: () => void;
    render(): JSX.Element;
}
