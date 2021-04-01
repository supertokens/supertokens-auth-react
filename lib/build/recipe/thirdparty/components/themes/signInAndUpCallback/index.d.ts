/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
export default class SignInAndUpCallbackTheme extends PureComponent {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    render: () => JSX.Element;
}
