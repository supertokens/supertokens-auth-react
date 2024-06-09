import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { UserContext } from "../../types";
import type {
    UserInput as RecipeModuleUserInput,
    NormalisedConfig as NormalisedRecipeModuleConfig,
} from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2/types";
export declare type PreAndPostAPIHookAction = never;
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
export declare type ComponentOverrideMap = {
    ResumePageSpinner: ComponentOverride<any>;
};
export declare type GetRedirectionURLContext = {
    action: "RESUME";
};
export declare type OnHandleEventContext = {
    action: "RESUMER";
    userContext: UserContext;
};
