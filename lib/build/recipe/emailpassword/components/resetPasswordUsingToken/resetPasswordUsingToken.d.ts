import { PureComponent } from "react";
import { ResetPasswordUsingTokenProps, onHandleResetPasswordUsingTokenSuccessContext, SubmitNewPasswordThemeResponse } from "../../types";
import EmailPassword from "../../emailPassword";
import { APIFormField, RequestJson } from "../../../../types";
declare class ResetPasswordUsingToken extends PureComponent<ResetPasswordUsingTokenProps, {
    token: string;
}> {
    constructor(props: ResetPasswordUsingTokenProps);
    getRecipeInstanceOrThrow: () => EmailPassword;
    submitNewPassword: (formFields: APIFormField[]) => Promise<SubmitNewPasswordThemeResponse>;
    onSubmitNewPasswordFormSuccess: () => Promise<void>;
    enterEmail: (formFields: APIFormField[]) => Promise<import("../../types").BaseResponse>;
    onEnterEmailFormSuccess: () => Promise<void>;
    onHandleSuccess: (context: onHandleResetPasswordUsingTokenSuccessContext) => Promise<void>;
    onSignInClicked: () => void;
    onCallEnterEmailAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<any>;
    onCallSubmitNewPasswordAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<any>;
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
