import { PureComponent } from "react";
import { EnterEmailThemeResponse, FeatureBaseProps, SubmitNewPasswordThemeResponse } from "../../../types";
import EmailPassword from "../../../emailPassword";
import { APIFormField } from "../../../../../types";
declare class ResetPasswordUsingToken extends PureComponent<FeatureBaseProps, {
    token: string;
}> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    submitNewPassword: (formFields: APIFormField[]) => Promise<SubmitNewPasswordThemeResponse>;
    onSubmitNewPasswordFormSuccess: () => Promise<void>;
    enterEmail: (formFields: APIFormField[]) => Promise<EnterEmailThemeResponse>;
    onEnterEmailFormSuccess: () => Promise<void>;
    onSignInClicked: () => void;
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
