import { PureComponent } from "react";
import { EmailPasswordAuthState, FeatureBaseProps } from "../types";
import EmailPassword from "../emailPassword";
declare class EmailPasswordAuth extends PureComponent<FeatureBaseProps, EmailPasswordAuthState> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    isEmailVerifiedAPI: () => Promise<boolean>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element | null;
}
export default EmailPasswordAuth;
