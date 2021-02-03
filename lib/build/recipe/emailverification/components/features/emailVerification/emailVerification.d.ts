import { PureComponent } from "react";
import { default as EmailVerificationRecipe } from "../../../emailVerification";
import { FeatureBaseProps } from "../../../../emailpassword/types";
declare class EmailVerification extends PureComponent<FeatureBaseProps<EmailVerificationRecipe>, {
    token: string;
}> {
    constructor(props: FeatureBaseProps<EmailVerificationRecipe>);
    getRecipeInstanceOrThrow: () => EmailVerificationRecipe;
    signOut: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
