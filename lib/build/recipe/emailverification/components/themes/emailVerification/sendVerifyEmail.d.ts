import React, { PureComponent } from "react";
import { SendVerifyEmailThemeState } from "../../../../emailpassword/types";
import { SendVerifyEmailThemeProps } from "../../../types";
export default class SendVerifyEmail extends PureComponent<SendVerifyEmailThemeProps, SendVerifyEmailThemeState> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: SendVerifyEmailThemeProps);
    onSuccess: () => void;
    sendEmail: () => Promise<void>;
    render(): JSX.Element;
}
