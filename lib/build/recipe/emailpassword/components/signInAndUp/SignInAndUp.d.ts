import { Component } from "react";
import { SignInThemeResponse, SignInAndUpProps, User, onHandleSignInAndUpSuccessContext, EmailPasswordFeature } from "../../types";
import { APIFormField, RequestJson } from "../../../../types";
declare class SignInAndUp extends Component<SignInAndUpProps, {
    user?: User;
    responseJson: any;
}> {
    constructor(props: SignInAndUpProps);
    getRecipeInstanceOrThrow: () => EmailPasswordFeature;
    signIn: (formFields: APIFormField[]) => Promise<SignInThemeResponse>;
    signInAPI: (formFields: APIFormField[]) => Promise<{
        response: SignInThemeResponse;
        responseJson?: any;
    }>;
    onSignInSuccess: () => Promise<void>;
    signUp: (formFields: APIFormField[]) => Promise<import("../../types").BaseResponse>;
    signUpAPI: (formFields: APIFormField[]) => Promise<{
        response: import("../../types").BaseResponse;
        responseJson?: any;
    }>;
    onSignUpSuccess: () => Promise<void>;
    doesSessionExist: () => Promise<boolean>;
    onHandleForgotPasswordClicked: () => Promise<void>;
    onHandleSuccess: (context: onHandleSignInAndUpSuccessContext) => Promise<void>;
    onCallSignUpAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<any>;
    onCallSignInAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<any>;
    componentDidMount: () => Promise<void>;
    render: () => JSX.Element;
}
export default SignInAndUp;
