import { PureComponent } from "react";
import { FormFieldState, SignUpThemeProps } from "../../../../types";
export default class SignUpTheme extends PureComponent<SignUpThemeProps, {
    formFields: FormFieldState[];
}> {
    constructor(props: SignUpThemeProps);
    render(): JSX.Element;
}
