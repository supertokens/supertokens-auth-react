import type { SuccessRedirectContextOAuth2 } from "../../types";
import type {
    UserInput as RecipeModuleUserInput,
    NormalisedConfig as NormalisedRecipeModuleConfig,
} from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2/types";
export declare type PreAndPostAPIHookAction = "GET_LOGIN_CHALLENGE_INFO";
export declare type UserInput = {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;
export declare type NormalisedConfig = NormalisedRecipeModuleConfig<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext
> & {
    override: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type GetRedirectionURLContext = SuccessRedirectContextOAuth2;
export declare type OnHandleEventContext = never;
