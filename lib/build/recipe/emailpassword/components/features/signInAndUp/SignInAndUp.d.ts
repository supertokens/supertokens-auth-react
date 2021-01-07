import { PureComponent } from "react";
import EmailPassword from "../../../emailPassword";
import { SignInAndUpProps, SignInAndUpState, SignInThemeResponse, SignUpThemeResponse, OnHandleSignInAndUpSuccessContext, SignInAPIResponse, EmailExistsAPIResponse, FormFieldThemeProps } from "../../../types";
import { APIFormField, NormalisedFormField, RequestJson } from "../../../../../types";
import Session from "../../../../session/session";
declare class SignInAndUp extends PureComponent<SignInAndUpProps, SignInAndUpState> {
    constructor(props: SignInAndUpProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    getSessionRecipe(): Session | undefined;
    signIn: (formFields: APIFormField[]) => Promise<SignInThemeResponse>;
    onSignInSuccess: () => Promise<void>;
    signUp: (formFields: APIFormField[]) => Promise<SignUpThemeResponse>;
    setStateOnSuccessfulAPICall(normalisedAPIResponse: SignInThemeResponse | SignUpThemeResponse): void;
    onSignUpSuccess: () => Promise<void>;
    doesSessionExist: () => Promise<boolean>;
    onHandleForgotPasswordClicked: () => Promise<void>;
    onHandleSuccess: (context: OnHandleSignInAndUpSuccessContext) => Promise<void>;
    onCallSignUpAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<import("../../../types").BaseSignInUpAPIResponse>;
    onCallSignInAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<SignInAPIResponse>;
    onCallEmailExistAPI: (value: string, headers: HeadersInit) => Promise<EmailExistsAPIResponse>;
    doesEmailExist: (value: string) => Promise<string | undefined>;
    getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[]): FormFieldThemeProps[];
    componentDidMount: () => Promise<void>;
    render: () => JSX.Element;
}
export default SignInAndUp;
