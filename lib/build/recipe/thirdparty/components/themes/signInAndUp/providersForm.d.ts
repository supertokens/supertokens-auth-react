/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { SignInAndUpThemeProps, ThirdPartySignInAndUpThemeState } from "../../../types";
export default class SignInAndUpProvidersForm extends PureComponent<SignInAndUpThemeProps, ThirdPartySignInAndUpThemeState> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: SignInAndUpThemeProps);
    signInClick: (providerId: string) => Promise<void>;
    render: () => JSX.Element;
}
