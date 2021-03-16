/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { SignUpThemeProps } from "../../../types";
export default class SignUp extends PureComponent<SignUpThemeProps> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    render(): JSX.Element;
}
