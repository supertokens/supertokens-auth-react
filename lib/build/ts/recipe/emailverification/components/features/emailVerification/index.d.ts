import { PureComponent } from "react";
import EmailVerificationRecipe from "../../../";
import { FeatureBaseProps } from "../../../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import { AuthRecipeModuleGetRedirectionURLContext, AuthRecipeModuleOnHandleEventContext, AuthRecipeModulePreAPIHookContext } from "../../../../authRecipeModule/types";
declare class EmailVerification extends PureComponent<FeatureBaseProps, {
    token: string;
}> {
    constructor(props: FeatureBaseProps);
    getAuthRecipeOrThrow: () => AuthRecipeModule<AuthRecipeModuleGetRedirectionURLContext, AuthRecipeModulePreAPIHookContext, AuthRecipeModuleOnHandleEventContext>;
    getRecipeInstanceOrThrow: () => EmailVerificationRecipe<unknown, unknown, unknown>;
    signOut: () => Promise<void>;
    onTokenInvalidRedirect: () => Promise<void>;
    componentDidMount(): Promise<void>;
    render: () => JSX.Element;
}
export default EmailVerification;
//# sourceMappingURL=index.d.ts.map