import { PureComponent } from "react";
import { SignInThemeProps, FormFieldState } from "../../../../types";
export default class SignInTheme extends PureComponent<SignInThemeProps, {
    formFields: FormFieldState[];
}> {
    constructor(props: SignInThemeProps);
    render(): JSX.Element;
}
