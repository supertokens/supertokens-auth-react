import { PureComponent } from "react";
import EmailPassword from "../../../emailPassword";
import { SignInAndUpState, SignInThemeResponse, SignUpThemeResponse, FormFieldThemeProps, FeatureBaseProps } from "../../../types";
import { APIFormField, NormalisedFormField } from "../../../../../types";
declare class SignInAndUp extends PureComponent<FeatureBaseProps, SignInAndUpState> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    signIn: (formFields: APIFormField[]) => Promise<SignInThemeResponse>;
    onSignInSuccess: () => Promise<void>;
    signUp: (formFields: APIFormField[]) => Promise<SignUpThemeResponse>;
    setStateOnSuccessfulAPICall(normalisedAPIResponse: SignInThemeResponse | SignUpThemeResponse): void;
    onSignUpSuccess: () => Promise<void>;
    onHandleForgotPasswordClicked: () => Promise<void>;
    doesEmailExist: (value: string) => Promise<string | undefined>;
    getThemeSignUpFeatureFormFields(formFields: NormalisedFormField[]): FormFieldThemeProps[];
    componentDidMount: () => Promise<void>;
    render: () => JSX.Element;
}
export default SignInAndUp;
