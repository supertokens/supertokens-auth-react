import React, { PureComponent } from "react";
import { SignUpThemeProps } from "../../../../types";
import { CSSObject } from "@emotion/react/types";
import { NormalisedPalette } from "../types";
export default class SignUpTheme extends PureComponent<SignUpThemeProps> {
    static contextType: React.Context<{
        [x: string]: CSSObject;
        palette: NormalisedPalette;
    }>;
    render(): JSX.Element;
}
