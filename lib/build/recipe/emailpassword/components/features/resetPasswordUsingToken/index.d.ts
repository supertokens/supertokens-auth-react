import { PureComponent } from "react";
import { EmailPasswordGetRedirectionURLContext, EmailPasswordOnHandleEventContext, EmailPasswordPreAPIHookContext, FormBaseAPIResponse, NormalisedEmailPasswordConfig } from "../../../types";
import { APIFormField, FeatureBaseProps } from "../../../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import { NormalisedAuthRecipeConfig } from "../../../../authRecipeModule/types";
declare class ResetPasswordUsingToken extends PureComponent<FeatureBaseProps, {
    token: string;
}> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => AuthRecipeModule<EmailPasswordGetRedirectionURLContext, EmailPasswordPreAPIHookContext, EmailPasswordOnHandleEventContext, NormalisedEmailPasswordConfig>;
    getRecipeConfigOrThrow: () => NormalisedEmailPasswordConfig & NormalisedAuthRecipeConfig;
    getIsEmbedded: () => boolean;
    submitNewPassword: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    enterEmail: (formFields: APIFormField[]) => Promise<FormBaseAPIResponse>;
    render: () => JSX.Element;
}
export default ResetPasswordUsingToken;
