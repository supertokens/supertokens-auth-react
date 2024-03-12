import type { DynamicLoginMethodsSpinnerTheme } from "./components/themes/dynamicLoginMethodsSpinner";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    UserInput as RecipeModuleUserInput,
    NormalisedConfig as NormalisedRecipeModuleConfig,
} from "../recipeModule/types";
import type OverrideableBuilder from "supertokens-js-override";
import type { RecipeInterface } from "supertokens-web-js/recipe/multitenancy/types";
export declare type PreAndPostAPIHookAction = "GET_LOGIN_METHODS";
export declare type UserInput = {
    override?: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
} & RecipeModuleUserInput<any, PreAndPostAPIHookAction, any>;
export declare type NormalisedConfig = NormalisedRecipeModuleConfig<any, PreAndPostAPIHookAction, any> & {
    override: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type GetLoginMethodsResponseNormalized = {
    thirdparty: {
        providers: {
            id: string;
            name: string;
        }[];
    };
    firstFactors: string[];
};
export declare type ComponentOverrideMap = {
    MultitenancyDynamicLoginMethodsSpinnerTheme_Override?: ComponentOverride<typeof DynamicLoginMethodsSpinnerTheme>;
};
