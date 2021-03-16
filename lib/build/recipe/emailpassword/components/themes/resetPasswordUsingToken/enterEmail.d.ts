/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { EnterEmailThemeProps, EnterEmailThemeState } from "../../../types";
export default class EnterEmailTheme extends PureComponent<EnterEmailThemeProps, EnterEmailThemeState> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: EnterEmailThemeProps);
    onSuccess: () => void;
    resend: () => void;
    render(): JSX.Element;
}
