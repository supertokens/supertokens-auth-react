import {
    UserInputForAuthRecipeModule as EmailVerificationUserInput,
    GetRedirectionURLContext as EmailVerificationGetRedirectionURLContext,
    OnHandleEventContext as EmailVerificationOnHandleEventContext,
    PreAPIHookContext as EmailVerificationPreAPIHookContext,
    ComponentOverrideMap as EmailVerificationComponentOverrideMap,
    RecipeInterface,
} from "../emailverification/types";
import * as AuthRecipeType from "../authRecipe/types";
export declare type User = AuthRecipeType.User;
export declare type UserInputOverride = {
    emailVerification?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
        components?: EmailVerificationComponentOverrideMap;
    };
};
export declare type UserInput<T, S, R> = {
    emailVerificationFeature?: EmailVerificationUserInput;
} & AuthRecipeType.UserInput<T, S, R>;
export declare type Config<T, S, R> = UserInput<T, S, R> & AuthRecipeType.Config<T, S, R>;
export declare type NormalisedConfig<T, S, R> = {
    emailVerificationFeature?: EmailVerificationUserInput;
    override?: {
        emailVerification?: {
            functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
            components?: EmailVerificationComponentOverrideMap;
        };
    };
} & AuthRecipeType.NormalisedConfig<T, S, R>;
export declare type GetRedirectionURLContext =
    | AuthRecipeType.GetRedirectionURLContext
    | EmailVerificationGetRedirectionURLContext;
export declare type PreAPIHookContext = EmailVerificationPreAPIHookContext;
export declare type OnHandleEventContext = AuthRecipeType.OnHandleEventContext | EmailVerificationOnHandleEventContext;
