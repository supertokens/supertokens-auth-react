import type {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig,
    UserInput as UserInputRecipeModule,
} from "../recipeModule/types";
export declare type UserInput<T, Action, R> = UserInputRecipeModule<T, Action, R>;
export declare type Config<T, S, R> = UserInput<T, S, R> & RecipeModuleConfig<T, S, R>;
export declare type NormalisedConfig<T, Action, R> = NormalisedRecipeModuleConfig<T, Action, R>;
export declare type OnHandleEventContext = {
    action: "SESSION_ALREADY_EXISTS";
};
