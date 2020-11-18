import { PureComponent } from "react";
import { EnterEmailThemeProps, EnterEmailThemeState } from "../../../../types";
export default class EnterEmailTheme extends PureComponent<EnterEmailThemeProps, EnterEmailThemeState> {
    constructor(props: EnterEmailThemeProps);
    onSuccess: () => void;
    resend: () => void;
    render(): JSX.Element;
}
