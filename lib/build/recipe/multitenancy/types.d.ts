import type { UserInput as RecipeModuleUserInput } from "../recipeModule/types";
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
export declare type NormalisedConfig = UserInput & {
    override: {
        functions?: (
            originalImplementation: RecipeInterface,
            builder: OverrideableBuilder<RecipeInterface>
        ) => RecipeInterface;
    };
};
export declare type GetLoginMethodsResponseNormalized = {
    passwordless: {
        enabled: boolean;
    };
    emailpassword: {
        enabled: boolean;
    };
    thirdparty: {
        enabled: boolean;
        providers: {
            id: string;
            name: string;
        }[];
    };
};
