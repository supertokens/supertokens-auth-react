import * as React from "react";
import { PureComponent } from "react";
export default class SignInAndUpCallbackTheme extends PureComponent {
    static contextType: React.Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    render: () => JSX.Element;
}
