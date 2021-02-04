import { PureComponent } from "react";
import { FeatureBaseProps, FormBaseAPIResponse } from "../../../types";
import EmailPassword from "../../../emailPassword";
import { APIFormField } from "../../../../../types";
declare class ResetPasswordUsingToken extends PureComponent<FeatureBaseProps<EmailPassword>, {
    token: string;
}> {
    constructor(props: FeatureBaseProps<EmailPassword>);
    getRecipeInstanceOrThrow: () => EmailPassword;
    submitNewPassword: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    enterEmail: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
