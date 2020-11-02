import { Component } from "react";
import { SubmitNewPasswordThemeProps, SubmitNewPasswordThemeState } from "../../../../types";
export default class SubmitNewPasswordTheme extends Component<SubmitNewPasswordThemeProps, SubmitNewPasswordThemeState> {
    constructor(props: SubmitNewPasswordThemeProps);
    onSuccess: () => void;
    render(): JSX.Element;
}
