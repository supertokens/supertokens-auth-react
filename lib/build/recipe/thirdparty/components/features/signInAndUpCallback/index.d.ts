import { PureComponent } from "react";
import { FeatureBaseProps } from "../../../../../types";
import { NormalisedConfig, GetRedirectionURLContext, PreAPIHookContext, RecipeInterface } from "../../../types";
import AuthRecipeModule from "../../../../authRecipeModule";
declare type PropType = FeatureBaseProps & {
    recipeImplementation: RecipeInterface;
};
declare class SignInAndUpCallback extends PureComponent<PropType, unknown> {
    getRecipeInstanceOrThrow: () => AuthRecipeModule<
        GetRedirectionURLContext,
        PreAPIHookContext,
        import("../../../../authRecipeModule/types").OnHandleEventContext,
        NormalisedConfig
    >;
    getIsEmbedded: () => boolean;
    componentDidMount: () => Promise<void>;
    getOAuthCallbackError: (providerIdFromPath: string) => string | undefined;
    render: () => JSX.Element;
}
export default SignInAndUpCallback;
