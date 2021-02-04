import React, { PureComponent } from "react";
import { SendVerifyEmailThemeProps, SendVerifyEmailThemeState } from "../../../../types";
export default class SendVerifyEmailTheme extends PureComponent<SendVerifyEmailThemeProps, SendVerifyEmailThemeState> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../types").NormalisedPalette;
    }>;
    constructor(props: SendVerifyEmailThemeProps);
    onSuccess: () => void;
    sendEmail: () => Promise<void>;
    render(): JSX.Element;
}
