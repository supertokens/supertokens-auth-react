import { PureComponent } from "react";
import { EnterEmailThemeResponse, ResetPasswordUsingTokenProps, onHandleResetPasswordUsingTokenSuccessContext, SubmitNewPasswordThemeResponse } from "../../../types";
import EmailPassword from "../../../emailPassword";
import { APIFormField } from "../../../../../types";
declare class ResetPasswordUsingToken extends PureComponent<ResetPasswordUsingTokenProps, {
    token: string;
}> {
    constructor(props: ResetPasswordUsingTokenProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    submitNewPassword: (formFields: APIFormField[]) => Promise<SubmitNewPasswordThemeResponse>;
    onSubmitNewPasswordFormSuccess: () => Promise<void>;
    enterEmail: (formFields: APIFormField[]) => Promise<EnterEmailThemeResponse>;
    onEnterEmailFormSuccess: () => Promise<void>;
    onHandleSuccess: (context: onHandleResetPasswordUsingTokenSuccessContext) => Promise<void>;
    onSignInClicked: () => void;
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
