/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { SendVerifyEmailThemeProps } from "../../../types";
export default class SendVerifyEmail extends PureComponent<
    SendVerifyEmailThemeProps,
    {
        status: "READY" | "EMAIL_RESENT" | "ERROR";
    }
> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: SendVerifyEmailThemeProps);
    resendEmail: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
}
