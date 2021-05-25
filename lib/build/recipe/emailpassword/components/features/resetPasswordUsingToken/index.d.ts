import { PureComponent } from "react";
import { GetRedirectionURLContext, OnHandleEventContext, PreAPIHookContext, FormBaseAPIResponse, NormalisedConfig } from "../../../types";
import { APIFormField, FeatureBaseProps } from "../../../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
declare class ResetPasswordUsingToken extends PureComponent<FeatureBaseProps, {
    token: string;
}> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>;
    getIsEmbedded: () => boolean;
    submitNewPassword: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    enterEmail: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
