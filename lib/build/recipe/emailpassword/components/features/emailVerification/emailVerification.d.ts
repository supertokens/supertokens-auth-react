import { PureComponent } from "react";
import { SendVerifyEmailThemeResponse, VerifyEmailThemeResponse, FeatureBaseProps } from "../../../types";
import EmailPassword from "../../../emailPassword";
declare class EmailVerification extends PureComponent<FeatureBaseProps, {
    token: string;
}> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    verifyEmail: () => Promise<VerifyEmailThemeResponse>;
    onEmailVerifiedSuccess: () => Promise<void>;
    sendVerifyEmail: () => Promise<SendVerifyEmailThemeResponse>;
    onSendVerifyEmailSuccess: () => Promise<void>;
    signOut: () => Promise<void>;
    redirectToVerifyEmailScreen: () => Promise<void>;
    onSuccessRedirect: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
