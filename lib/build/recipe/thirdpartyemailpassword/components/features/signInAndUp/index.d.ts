import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { NormalisedConfig } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import { GetRedirectionURLContext, PreAPIHookContext } from "../../..";
declare class SignInAndUp extends PureComponent<FeatureBaseProps> {
    getRecipeInstanceOrThrow: () => AuthRecipeModule<
        GetRedirectionURLContext,
        PreAPIHookContext,
        import("../../../../emailpassword").OnHandleEventContext,
        NormalisedConfig
    >;
    getIsEmbedded: () => boolean;
    render: () => JSX.Element;
}
export default SignInAndUp;
