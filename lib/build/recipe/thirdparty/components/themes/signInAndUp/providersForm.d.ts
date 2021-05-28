/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { SignInAndUpThemeProps } from "../../../types";
export default class SignInAndUpProvidersForm extends PureComponent<SignInAndUpThemeProps, unknown> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    signInClick: (providerId: string) => Promise<void>;
    render: () => JSX.Element;
}
