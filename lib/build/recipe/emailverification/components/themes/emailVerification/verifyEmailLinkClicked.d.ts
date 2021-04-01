/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { VerifyEmailLinkClickedThemeProps, VerifyEmailLinkClickedThemeState } from "../../../types";
export default class VerifyEmailLinkClicked extends PureComponent<VerifyEmailLinkClickedThemeProps, VerifyEmailLinkClickedThemeState> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: VerifyEmailLinkClickedThemeProps);
    onSuccess: () => void;
    componentDidMount: () => Promise<void>;
    render(): JSX.Element;
}
