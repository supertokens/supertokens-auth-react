import React, { PureComponent } from "react";
import { SignUpThemeProps } from "../../../types";
export default class SignUpTheme extends PureComponent<SignUpThemeProps> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    render(): JSX.Element;
}
