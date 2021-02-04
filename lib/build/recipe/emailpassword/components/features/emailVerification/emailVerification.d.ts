import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../types";
import EmailPassword from "../../../emailPassword";
declare class EmailVerification extends PureComponent<FeatureBaseProps<EmailPassword>, {
    token: string;
}> {
    constructor(props: FeatureBaseProps<EmailPassword>);
    getRecipeInstanceOrThrow: () => EmailPassword;
    signOut: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
