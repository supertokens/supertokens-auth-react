import { PureComponent } from "react";
import { EmailVerificationProps, onHandleEmailVerificationSuccessContext, SendVerifyEmailThemeResponse, VerifyEmailThemeResponse } from "../../../types";
import EmailPassword from "../../../emailPassword";
import Session from "../../../../session/session";
declare class EmailVerification extends PureComponent<EmailVerificationProps, {
    token: string;
}> {
    constructor(props: EmailVerificationProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    verifyEmail: () => Promise<VerifyEmailThemeResponse>;
    onEmailVerifiedSuccess: () => Promise<void>;
    sendVerifyEmail: () => Promise<SendVerifyEmailThemeResponse>;
    onSendVerifyEmailSuccess: () => Promise<void>;
    onHandleSuccess: (context: onHandleEmailVerificationSuccessContext) => Promise<void>;
    signOut: () => Promise<void>;
    getSessionRecipe(): Session | undefined;
    doesSessionExist: () => Promise<boolean>;
    redirectToVerifyEmailScreen: () => Promise<void>;
    onSuccessRedirect: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
