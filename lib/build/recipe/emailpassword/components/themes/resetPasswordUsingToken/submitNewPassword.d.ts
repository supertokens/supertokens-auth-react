/// <reference types="@emotion/react/types/css-prop" />
import { PureComponent } from "react";
import { SubmitNewPasswordThemeProps, SubmitNewPasswordThemeState } from "../../../types";
export default class SubmitNewPasswordTheme extends PureComponent<SubmitNewPasswordThemeProps, SubmitNewPasswordThemeState> {
    static contextType: import("react").Context<{
        [x: string]: import("@emotion/serialize").CSSObject;
        palette: import("../../../../../types").NormalisedPalette;
    }>;
    constructor(props: SubmitNewPasswordThemeProps);
    onSuccess: () => void;
    render(): JSX.Element;
}
