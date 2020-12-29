import React, { PureComponent } from "react";
import { CSSObject } from "@emotion/react/types";
import { SubmitNewPasswordThemeProps, SubmitNewPasswordThemeState } from "../../../../types";
import { NormalisedPalette } from "../types";
export default class SubmitNewPasswordTheme extends PureComponent<SubmitNewPasswordThemeProps, SubmitNewPasswordThemeState> {
    static contextType: React.Context<{
        [x: string]: CSSObject;
        palette: NormalisedPalette;
    }>;
    constructor(props: SubmitNewPasswordThemeProps);
    onSuccess: () => void;
    render(): JSX.Element;
}
