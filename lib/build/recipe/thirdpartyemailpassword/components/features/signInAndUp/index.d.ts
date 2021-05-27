import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { NormalisedConfig } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import { GetRedirectionURLContext, PreAPIHookContext } from "../../..";
import { RecipeInterface as EmailPasswordRecipeInterface } from "../../../../emailpassword/types";
import { RecipeInterface as ThirdPartyRecipeInterface } from "../../../../thirdparty/types";
declare class SignInAndUp extends PureComponent<
    FeatureBaseProps & {
        emailPasswordRecipeImplementation: EmailPasswordRecipeInterface;
        thirdPartyRecipeImplementation: ThirdPartyRecipeInterface;
    }
> {
    getRecipeInstanceOrThrow: () => AuthRecipeModule<
        GetRedirectionURLContext,
        PreAPIHookContext,
        import("../../../../emailpassword/types").OnHandleEventContext,
        NormalisedConfig
    >;
    getIsEmbedded: () => boolean;
    render: () => JSX.Element;
}
export default SignInAndUp;
