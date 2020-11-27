import React, { PureComponent } from "react";
import { SignInThemeProps, FormFieldState } from "../../../../types";
import { CSSObject } from "@emotion/serialize/types";
import { NormalisedPalette } from "../types";
export default class SignInTheme extends PureComponent<SignInThemeProps, {
    formFields: FormFieldState[];
}> {
    static contextType: React.Context<{
        [x: string]: CSSObject;
        palette: NormalisedPalette;
    }>;
    constructor(props: SignInThemeProps);
    render(): JSX.Element;
}
