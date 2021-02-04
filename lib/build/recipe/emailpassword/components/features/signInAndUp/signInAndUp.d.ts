import { PureComponent } from "react";
import EmailPassword from "../../../emailPassword";
import { SignInAndUpState, FormFieldThemeProps, FeatureBaseProps, FormBaseAPIResponse } from "../../../types";
import { APIFormField, NormalisedFormField } from "../../../../../types";
declare class SignInAndUp extends PureComponent<FeatureBaseProps<EmailPassword>, SignInAndUpState> {
    constructor(props: FeatureBaseProps<EmailPassword>);
    getRecipeInstanceOrThrow: () => EmailPassword;
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
