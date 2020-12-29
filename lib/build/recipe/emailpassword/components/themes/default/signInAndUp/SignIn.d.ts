import React, { PureComponent } from "react";
import { SignInThemeProps } from "../../../../types";
import { CSSObject } from "@emotion/react/types";
import { NormalisedPalette } from "../types";
export default class SignInTheme extends PureComponent<SignInThemeProps> {
    static contextType: React.Context<{
        [x: string]: CSSObject;
        palette: NormalisedPalette;
    }>;
    render(): JSX.Element;
}
