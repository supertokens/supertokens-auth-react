import * as React from "react";
import { PureComponent } from "react";
import { SignInAndUpThemeProps, ThirdPartySignInAndUpThemeState } from "../../../types";
export declare class SignInAndUpProvidersTheme extends PureComponent<SignInAndUpThemeProps, ThirdPartySignInAndUpThemeState> {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: SignInAndUpThemeProps);
    signInClick: (providerId: string) => Promise<void>;
    render: () => JSX.Element;
}
declare function SignInAndUpTheme(props: SignInAndUpThemeProps): JSX.Element;
export default SignInAndUpTheme;
