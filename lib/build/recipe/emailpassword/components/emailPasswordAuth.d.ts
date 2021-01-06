import { PureComponent } from "react";
import { EmailPasswordAuthProps, EmailPasswordAuthState, IsEmailVerifiedAPIResponse } from "../types";
import Session from "../../session/session";
import EmailPassword from "../emailPassword";
declare class EmailPasswordAuth extends PureComponent<EmailPasswordAuthProps, EmailPasswordAuthState> {
    constructor(props: EmailPasswordAuthProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    getSessionRecipe(): Session | undefined;
    doesSessionExist: () => Promise<boolean>;
    onCallIsEmailVerifiedAPI: (headers: HeadersInit) => Promise<IsEmailVerifiedAPIResponse>;
    isEmailVerifiedAPI: () => Promise<boolean>;
    onHandleShowEmailVerificationScreen: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailPasswordAuth;
