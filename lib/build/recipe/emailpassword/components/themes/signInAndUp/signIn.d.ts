import React, { PureComponent } from "react";
import { SignInThemeProps } from "../../../types";
export declare function SignInForm(props: SignInThemeProps & {
    header?: JSX.Element;
    footer?: JSX.Element;
}): JSX.Element;
export default class SignInTheme extends PureComponent<SignInThemeProps> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    render(): JSX.Element;
}
