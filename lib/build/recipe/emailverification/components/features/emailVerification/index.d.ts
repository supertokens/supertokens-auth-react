import { PureComponent } from "react";
import EmailVerificationRecipe from "../../../";
import { FeatureBaseProps } from "../../../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
declare class EmailVerification<T, S, R, N> extends PureComponent<FeatureBaseProps, {
    token: string;
}> {
    constructor(props: FeatureBaseProps);
    getAuthRecipeOrThrow: () => AuthRecipeModule<T, S, R, N>;
    getRecipeInstanceOrThrow: () => EmailVerificationRecipe<unknown, unknown, unknown>;
    signOut: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
