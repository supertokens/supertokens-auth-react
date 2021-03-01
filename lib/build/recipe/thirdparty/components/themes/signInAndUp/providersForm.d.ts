import * as React from "react";
import { PureComponent } from "react";
import { SignInAndUpThemeProps, ThirdPartySignInAndUpThemeState } from "../../../types";
export default class SignInAndUpProvidersForm extends PureComponent<SignInAndUpThemeProps, ThirdPartySignInAndUpThemeState> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: SignInAndUpThemeProps);
    signInClick: (providerId: string) => Promise<void>;
    render: () => JSX.Element;
}
