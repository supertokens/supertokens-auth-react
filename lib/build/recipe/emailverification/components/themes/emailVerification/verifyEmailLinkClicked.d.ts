/// <reference types="@emotion/react/types/css-prop" />
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { PureComponent } from "react";
import { VerifyEmailLinkClickedThemeProps } from "../../../types";
export default class VerifyEmailLinkClicked extends PureComponent<
    VerifyEmailLinkClickedThemeProps,
    {
        status: "LOADING" | "INVALID" | "GENERAL_ERROR" | "SUCCESSFUL";
    }
> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: VerifyEmailLinkClickedThemeProps);
    componentDidMount(): Promise<void>;
    render(): jsx.JSX.Element;
}
