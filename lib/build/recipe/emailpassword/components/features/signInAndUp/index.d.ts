import { PureComponent } from "react";
import { FormFieldThemeProps, FormBaseAPIResponse, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig } from "../../../types";
import { APIFormField, FeatureBaseProps, NormalisedFormField } from "../../../../../types";
import { SignInAndUpState } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
declare class SignInAndUp extends PureComponent<FeatureBaseProps, SignInAndUpState> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>;
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
