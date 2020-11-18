import { PureComponent } from "react";
import { EnterEmailThemeResponse, ResetPasswordUsingTokenProps, onHandleResetPasswordUsingTokenSuccessContext, SubmitNewPasswordThemeResponse, SubmitNewPasswordAPIResponse } from "../../../types";
import EmailPassword from "../../../emailPassword";
import { APIFormField, RequestJson } from "../../../../../types";
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
    onCallSendResetEmailAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<import("../../../types").BaseResetPasswordAPIResponse>;
    onCallSubmitNewPasswordAPI: (requestJson: RequestJson, headers: HeadersInit) => Promise<SubmitNewPasswordAPIResponse>;
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
