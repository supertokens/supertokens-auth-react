import { PureComponent } from "react";
import { FormBaseAPIResponse } from "../../../types";
import { APIFormField, FeatureBaseProps } from "../../../../../types";
declare class ResetPasswordUsingToken extends PureComponent<FeatureBaseProps, {
    token: string;
}> {
    constructor(props: FeatureBaseProps);
    submitNewPassword: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    enterEmail: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
