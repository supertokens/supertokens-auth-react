import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { UserContext } from "../../types";
import type {
    UserInput as RecipeModuleUserInput,
    NormalisedConfig as NormalisedRecipeModuleConfig,
} from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2/types";

export type PreAndPostAPIHookAction = never;

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

export type ComponentOverrideMap = {
    ResumePageSpinner: ComponentOverride<any>; // TODO: proper component list. this is a just placeholder to the typechecker happy
};

export type GetRedirectionURLContext = {
    // TODO: proper list
    action: "RESUME";
};

export type OnHandleEventContext = {
    // TODO: proper list
    action: "RESUMER";
    userContext: UserContext;
};
