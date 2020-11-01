import { Component } from "react";
import { SubmitNewPasswordThemeProps, FormFieldState } from "../../../../types";
export default class SubmitNewPasswordTheme extends Component<SubmitNewPasswordThemeProps, {
    hasNewPassword?: boolean;
    formFields: FormFieldState[];
}> {
    constructor(props: SubmitNewPasswordThemeProps);
    onSuccess: () => void;
    render(): JSX.Element;
}
