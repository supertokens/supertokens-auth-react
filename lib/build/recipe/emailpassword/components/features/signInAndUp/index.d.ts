import { PureComponent } from "react";
import { FormFieldThemeProps, FormBaseAPIResponse, EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext, NormalisedEmailPasswordConfig } from "../../../types";
import { APIFormField, FeatureBaseProps, NormalisedFormField } from "../../../../../types";
import { NormalisedAuthRecipeConfig, SignInAndUpState } from "../../../../authRecipeModule/types";
import AuthRecipeModule from "../../../../authRecipeModule";
declare class SignInAndUp extends PureComponent<FeatureBaseProps, SignInAndUpState> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext, NormalisedEmailPasswordConfig>;
    getRecipeConfigOrThrow: () => NormalisedEmailPasswordConfig & NormalisedAuthRecipeConfig;
    getIsEmbedded: () => boolean;
    signIn: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    onSignInSuccess: () => Promise<void>;
    signUp: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    setStateOnSuccessfulAPICall(normalisedAPIResponse: FormBaseAPIResponse): void;
    onSignUpSuccess: () => Promise<void>;
    getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[]): FormFieldThemeProps[];
    componentDidMount: () => Promise<void>;
    render: () => JSX.Element;
}
export default SignInAndUp;
