import { Component } from "react";
import { SignInThemeResponse, EmailPasswordProps, User, SignUpThemeResponse } from "../../types";
import EmailPassword from "../../emailPassword";
import { APIFormField, RequestJson } from "../../../../types";
declare class SignInAndUp extends Component<EmailPasswordProps, {
    user?: User;
    responseJson: any;
}> {
    constructor(props: EmailPasswordProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    signIn: (formFields: APIFormField[]) => Promise<SignInThemeResponse>;
    signInAPI: (formFields: APIFormField[]) => Promise<{
        response: SignInThemeResponse;
        responseJson?: any;
    }>;
    onSignInSuccess: () => Promise<void>;
    signUp: (formFields: APIFormField[]) => Promise<SignUpThemeResponse>;
    signUpAPI: (formFields: APIFormField[]) => Promise<{
        response: SignUpThemeResponse;
        responseJson?: any;
    }>;
    onSignUpSuccess: () => Promise<void>;
    doesSessionExist: () => Promise<boolean>;
    onHandleForgotPasswordClicked: () => Promise<void>;
    onHandleSuccess: (context: any, user?: any, responseJson?: any) => Promise<void>;
    onCallSignUpAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<any>;
    onCallSignInAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<any>;
    componentDidMount: () => Promise<void>;
    render: () => JSX.Element;
}
export default SignInAndUp;
