import type { SuccessRedirectContextOAuth2, UserContext } from "../../types";
import type {
    UserInput as RecipeModuleUserInput,
    NormalisedConfig as NormalisedRecipeModuleConfig,
} from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2/types";

export type PreAndPostAPIHookAction = "GET_LOGIN_CHALLENGE_INFO";

export type PreAPIHookContext = {
    action: PreAndPostAPIHookAction;
    requestInit: RequestInit;
    url: string;
    userContext: UserContext;
};

export type UserInput = {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext>;

export type NormalisedConfig = NormalisedRecipeModuleConfig<
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

export type GetRedirectionURLContext = SuccessRedirectContextOAuth2;

export type OnHandleEventContext = never;
