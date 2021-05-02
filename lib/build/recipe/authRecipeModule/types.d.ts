import { EmailVerificationUserInput, NormalisedEmailVerificationConfig } from "../emailverification/types";
import { RecipeModuleConfig, RecipeModuleHooks } from "../recipeModule/types";
export declare type User = {
    id: string;
    email: string;
};
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
    isNewUser: boolean;
    redirectToPath?: string;
} | {
    action: "SIGN_IN_AND_UP" | "VERIFY_EMAIL";
};
export declare type AuthRecipeModulePreAPIHookContext = {
    action: "VERIFY_EMAIL" | "SEND_VERIFY_EMAIL" | "IS_EMAIL_VERIFIED" | "SIGN_OUT" | "SIGN_IN";
    requestInit: RequestInit;
    url: string;
};
export declare type AuthRecipeModuleOnHandleEventContext = {
    action: "SESSION_ALREADY_EXISTS" | "VERIFY_EMAIL_SENT" | "EMAIL_VERIFIED_SUCCESSFUL";
} | {
    action: "SUCCESS";
    isNewUser: boolean;
    user: {
        id: string;
        email: string;
    };
};
export declare type SignInAndUpState = {
    status: "LOADING" | "READY";
} | {
    status: "SUCCESSFUL";
    user: User;
};
