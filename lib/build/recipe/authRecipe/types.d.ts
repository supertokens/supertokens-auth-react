/// <reference types="react" />
import type { ComponentOverride } from "../../components/componentOverride/componentOverride";
import type { AuthComponentProps, Navigate, PartialAuthComponentProps, UserContext } from "../../types";
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
    AuthPageHeader_Override: ComponentOverride<any>;
    AuthPageFooter_Override: ComponentOverride<any>;
    AuthPageLoginMethodList_Override: ComponentOverride<any>;
};
declare type ComponentWithPreloadInfo<T> = {
    component: React.FC<
        AuthComponentProps & {
            preloadInfo: T;
        }
    >;
    preloadInfo: T;
};
export declare type AuthPageThemeProps = {
    showUseAnotherLink: boolean;
    setFactorList: (factorIds: string[] | undefined) => void;
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
