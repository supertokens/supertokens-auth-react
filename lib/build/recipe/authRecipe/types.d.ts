/// <reference types="react" />
import type { AuthPageComponentList } from "./components/theme/authPage/authPageComponentList";
import type { AuthPageFooter } from "./components/theme/authPage/authPageFooter";
import type { AuthPageHeader } from "./components/theme/authPage/authPageHeader";
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type {
    AuthComponentProps,
    Navigate,
    PartialAuthComponentProps,
    SuccessRedirectContext,
    UserContext,
} from "../../types";
import type {
    Config as RecipeModuleConfig,
    NormalisedConfig as NormalisedRecipeModuleConfig,
    UserInput as UserInputRecipeModule,
} from "../recipeModule/types";
export declare type UserInput<T, Action, R> = UserInputRecipeModule<T, Action, R>;
export declare type Config<T, S, R> = UserInput<T, S, R> & RecipeModuleConfig<T, S, R>;
export declare type NormalisedConfig<T, Action, R> = NormalisedRecipeModuleConfig<T, Action, R>;
export declare type OnHandleEventContext = never;
export declare type ComponentOverrideMap = {
    AuthPageHeader_Override?: ComponentOverride<typeof AuthPageHeader>;
    AuthPageFooter_Override?: ComponentOverride<typeof AuthPageFooter>;
    AuthPageComponentList_Override?: ComponentOverride<typeof AuthPageComponentList>;
};
declare type ComponentWithPreloadInfo<T> = {
    component: React.FC<
        AuthComponentProps & {
            preloadInfo: T;
        }
    >;
    preloadInfo: T;
};
export declare type AuthSuccessContext = Omit<
    SuccessRedirectContext,
    "redirectToPath" | "action" | "loginChallenge" | "recipeId"
> & {
    recipeId: string;
};
export declare type AuthPageThemeProps = {
    oauth2ClientInfo?: {
        clientLogo?: string;
        clientUri?: string;
        clientName: string;
    };
    onAuthSuccess: (successContext: AuthSuccessContext) => Promise<void>;
    showBackButton: boolean;
    setFactorList: (factorIds: string[]) => void;
    resetFactorList: () => void;
    fullPageCompWithPreloadedInfo?: ComponentWithPreloadInfo<any>;
    authComponents: React.FC<PartialAuthComponentProps>[];
    factorIds: string[];
    hasSeparateSignUpView: boolean;
    isSignUp: boolean;
    onSignInUpSwitcherClick: () => void;
    error: string | undefined;
    onError: (err: string) => void;
    clearError: () => void;
    rebuildAuthPage: () => void;
    privacyPolicyLink: string | undefined;
    termsOfServiceLink: string | undefined;
    userContext: UserContext;
    navigate: Navigate | undefined;
};
export {};
