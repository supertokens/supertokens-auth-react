import React, { PureComponent } from "react";
import { FormFieldState, SignUpThemeProps } from "../../../../types";
import { CSSObject } from "@emotion/serialize/types";
import { NormalisedPalette } from "../types";
export default class SignUpTheme extends PureComponent<SignUpThemeProps, {
    formFields: FormFieldState[];
}> {
    static contextType: React.Context<{
        [x: string]: CSSObject;
        palette: NormalisedPalette;
    }>;
    constructor(props: SignUpThemeProps);
    render(): JSX.Element;
}
