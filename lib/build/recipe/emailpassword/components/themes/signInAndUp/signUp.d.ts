import React, { PureComponent } from "react";
import { SignUpThemeProps } from "../../../types";
export declare function SignUpForm(props: SignUpThemeProps & {
    header?: JSX.Element;
    footer?: JSX.Element;
}): JSX.Element;
export default class SignUpTheme extends PureComponent<SignUpThemeProps> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    render(): JSX.Element;
}
