import { PureComponent } from "react";
import { SignInAndUpState, FormFieldThemeProps, FormBaseAPIResponse } from "../../../types";
import { APIFormField, FeatureBaseProps, NormalisedFormField } from "../../../../../types";
declare class SignInAndUp extends PureComponent<FeatureBaseProps, SignInAndUpState> {
    constructor(props: FeatureBaseProps);
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
