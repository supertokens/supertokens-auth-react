import React, { PureComponent } from "react";
import { VerifyEmailLinkClickedThemeProps, VerifyEmailLinkClickedThemeState } from "../../../types";
export default class VerifyEmailLinkClickedTheme extends PureComponent<VerifyEmailLinkClickedThemeProps, VerifyEmailLinkClickedThemeState> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../styles/types").NormalisedPalette;
    }>;
    constructor(props: VerifyEmailLinkClickedThemeProps);
    onSuccess: () => void;
    componentDidMount: () => Promise<void>;
    render(): JSX.Element;
}
