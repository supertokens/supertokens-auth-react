/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { SignInAndUpThemeProps } from "../../../types";
export default class SignInAndUpProvidersForm extends PureComponent<
    SignInAndUpThemeProps,
    {
        error?: string;
    }
> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: SignInAndUpThemeProps);
    componentDidUpdate(): void;
    signInClick: (providerId: string) => Promise<void>;
    render: () => JSX.Element;
}
