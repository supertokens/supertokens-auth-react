import { EmailVerificationUserInput, NormalisedEmailVerificationConfig } from "../emailverification/types";
import { RecipeModuleConfig, RecipeModuleHooks } from "../recipeModule/types";
export declare type AuthRecipeModuleConfig<T, S, R> = AuthRecipeModuleUserInput<T, S, R> & RecipeModuleConfig<T, S, R>;
export declare type AuthRecipeModuleUserInput<T, S, R> = RecipeModuleHooks<T, S, R> & {
    useShadowDom?: boolean;
    palette?: Record<string, string>;
    emailVerificationFeature?: EmailVerificationUserInput;
};
export declare type NormalisedAuthRecipeConfig = {
    useShadowDom: boolean;
    palette: Record<string, string>;
    emailVerificationFeature: NormalisedEmailVerificationConfig;
};
export declare type AuthRecipeModuleGetRedirectionURLContext = {
    action: "SUCCESS";
    redirectToPath?: string;
} | {
    action: "SIGN_IN_AND_UP" | "VERIFY_EMAIL";
};
