import {
    UserInputForAuthRecipeModule as EmailVerificationUserInput,
    GetRedirectionURLContext as EmailVerificationGetRedirectionURLContext,
    OnHandleEventContext as EmailVerificationOnHandleEventContext,
    PreAPIHookContext as EmailVerificationPreAPIHookContext,
    PreAndPostAPIHookAction as EmailVerificationPreAndPostAPIHookAction,
    ComponentOverrideMap as EmailVerificationComponentOverrideMap,
} from "../emailverification/types";
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import * as AuthRecipeType from "../authRecipe/types";
export declare type User = AuthRecipeType.User;
export declare type UserInputOverride = {
    emailVerification?: {
        functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
        components?: EmailVerificationComponentOverrideMap;
    };
};
export declare type UserInput<T, PreAndPostAPIHookAction, R> = {
    emailVerificationFeature?: EmailVerificationUserInput;
} & AuthRecipeType.UserInput<T, PreAndPostAPIHookAction, R>;
export declare type Config<T, PreAndPostAPIHookAction, R> = UserInput<T, PreAndPostAPIHookAction, R> &
    AuthRecipeType.Config<T, PreAndPostAPIHookAction, R>;
export declare type NormalisedConfig<T, PreAndPostAPIHookAction, R> = {
    emailVerificationFeature?: EmailVerificationUserInput;
    override?: {
        emailVerification?: {
            functions?: (originalImplementation: RecipeInterface) => RecipeInterface;
            components?: EmailVerificationComponentOverrideMap;
        };
    };
} & AuthRecipeType.NormalisedConfig<T, PreAndPostAPIHookAction, R>;
export declare type GetRedirectionURLContext =
    | AuthRecipeType.GetRedirectionURLContext
    | EmailVerificationGetRedirectionURLContext;
export declare type PreAndPostAPIHookAction = EmailVerificationPreAndPostAPIHookAction;
export declare type PreAPIHookContext = EmailVerificationPreAPIHookContext;
export declare type OnHandleEventContext = AuthRecipeType.OnHandleEventContext | EmailVerificationOnHandleEventContext;
