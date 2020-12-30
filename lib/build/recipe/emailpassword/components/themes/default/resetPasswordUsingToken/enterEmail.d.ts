import React, { PureComponent } from "react";
import { EnterEmailThemeProps, EnterEmailThemeState } from "../../../../types";
export default class EnterEmailTheme extends PureComponent<EnterEmailThemeProps, EnterEmailThemeState> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/react").CSSObject;
        palette: import("../types").NormalisedPalette;
    }>;
    constructor(props: EnterEmailThemeProps);
    onSuccess: () => void;
    resend: () => void;
    render(): JSX.Element;
}
