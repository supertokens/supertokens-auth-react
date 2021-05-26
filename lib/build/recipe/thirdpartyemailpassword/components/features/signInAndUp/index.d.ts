import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { NormalisedConfig } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
import { GetRedirectionURLContext, PreAPIHookContext } from "../../..";
import { RecipeInterface } from "../../../../emailpassword/types";
declare class SignInAndUp extends PureComponent<
    FeatureBaseProps & {
        emailPasswordRecipeImplementation: RecipeInterface;
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
