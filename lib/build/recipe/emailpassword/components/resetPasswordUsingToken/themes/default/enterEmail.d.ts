import { Component } from "react";
import { EnterEmailThemeProps, EnterEmailThemeState } from "../../../../types";
export default class EnterEmailTheme extends Component<EnterEmailThemeProps, EnterEmailThemeState> {
    constructor(props: EnterEmailThemeProps);
    onSuccess: () => void;
    resend: () => void;
    render(): JSX.Element;
}
