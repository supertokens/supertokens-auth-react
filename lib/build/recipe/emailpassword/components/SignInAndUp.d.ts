import * as React from "react";
import { APIResponse, EmailPasswordProps } from '../types';
import EmailPassword from "../emailPassword";
import { APIFormFields, RequestJson } from "../../../types";
declare class SignInAndUp extends React.Component<EmailPasswordProps> {
    getRecipeInstanceOrThrow: () => EmailPassword;
    componentDidMount(): Promise<void>;
    render(): JSX.Element;
    signInAPI: (formFields: APIFormFields[]) => Promise<APIResponse>;
    signUpAPI: (formFields: APIFormFields[]) => Promise<Response>;
    doesSessionExist: () => Promise<boolean>;
    onHandleForgotPasswordClicked: () => Promise<void>;
    onHandleSuccess: (context: any, user?: any, responseJson?: any) => Promise<void>;
    onCallSignUpAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
    onCallSignInAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<Response>;
}
export default SignInAndUp;
