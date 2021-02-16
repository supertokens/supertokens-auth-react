import { PureComponent } from "react";
import EmailVerificationRecipe from "../../../";
import { FeatureBaseProps } from "../../../../../types";
declare class EmailVerification extends PureComponent<FeatureBaseProps, {
    token: string;
}> {
    constructor(props: FeatureBaseProps);
    getRecipeInstanceOrThrow: () => EmailVerificationRecipe<unknown, unknown, unknown>;
    signOut: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
