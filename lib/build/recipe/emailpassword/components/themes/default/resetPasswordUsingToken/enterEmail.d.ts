import React, { PureComponent } from "react";
import { EnterEmailThemeProps, EnterEmailThemeState } from "../../../../types";
import { CSSObject } from "@emotion/react/types";
import { NormalisedPalette } from "../types";
export default class EnterEmailTheme extends PureComponent<EnterEmailThemeProps, EnterEmailThemeState> {
    static contextType: React.Context<{
        [x: string]: CSSObject;
        palette: NormalisedPalette;
    }>;
    constructor(props: EnterEmailThemeProps);
    onSuccess: () => void;
    resend: () => void;
    render(): JSX.Element;
}
