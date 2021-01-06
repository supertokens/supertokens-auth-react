import { PureComponent } from "react";
import { EmailVerificationProps, onHandleEmailVerificationSuccessContext, VerifyEmailAPIResponse, VerifyEmailThemeResponse } from "../../../types";
import EmailPassword from "../../../emailPassword";
import { RequestJson } from "../../../../../types";
import Session from "../../../../session/session";
declare class EmailVerification extends PureComponent<EmailVerificationProps, {
    token: string;
}> {
    constructor(props: EmailVerificationProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    verifyEmail: () => Promise<VerifyEmailThemeResponse>;
    onEmailVerifiedSuccess: () => Promise<void>;
    sendVerifyEmail: () => Promise<import("../../../types").EnterEmailThemeResponse>;
    onSendVerifyEmailSuccess: () => Promise<void>;
    onHandleSuccess: (context: onHandleEmailVerificationSuccessContext) => Promise<void>;
    onSignInClicked: () => void;
    onCallVerifyEmailAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<VerifyEmailAPIResponse>;
    onCallSendVerifyEmailAPI: (headers: HeadersInit) => Promise<{
        status: import("../../../constants").API_RESPONSE_STATUS.OK;
    }>;
    signOut: () => Promise<void>;
    getSessionRecipe(): Session | undefined;
    doesSessionExist: () => Promise<boolean>;
    redirectToVerifyEmailScreen: () => Promise<void>;
    onSuccessfulEmailVerificationContinueClicked: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
