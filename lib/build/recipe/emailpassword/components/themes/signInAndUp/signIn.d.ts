/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { SignInThemeProps } from "../../../types";
export default class SignIn extends PureComponent<SignInThemeProps> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    render(): JSX.Element;
}
