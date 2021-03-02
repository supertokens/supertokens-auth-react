/// <reference types="react" />
import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import { AuthRecipeModuleGetRedirectionURLContext, AuthRecipeModuleOnHandleEventContext, AuthRecipeModulePreAPIHookContext, AuthRecipeModuleUserInput, SignInAndUpState, User } from "../authRecipeModule/types";
import { RecipeModuleConfig } from "../recipeModule/types";
import Provider from "./providers";
import { CustomProviderConfig } from "./providers/types";
export declare type ThirdPartyUserInput = AuthRecipeModuleUserInput<ThirdPartyGetRedirectionURLContext, ThirdPartyPreAPIHookContext, ThirdPartyOnHandleEventContext> & {
    palette?: Record<string, string>;
    useShadowDom?: boolean;
    signInAndUpFeature: SignInAndUpFeatureUserInput;
};
export declare type ThirdPartyConfig = ThirdPartyUserInput & RecipeModuleConfig<ThirdPartyGetRedirectionURLContext, ThirdPartyPreAPIHookContext, ThirdPartyOnHandleEventContext>;
export declare type NormalisedThirdPartyConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
};
export declare type SignInAndUpFeatureUserInput = FeatureBaseConfig & {
    disableDefaultImplementation?: boolean;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    providers?: (Provider | CustomProviderConfig)[];
};
export declare type NormalisedSignInAndUpFeatureConfig = NormalisedBaseConfig & {
    disableDefaultImplementation: boolean;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    providers: Provider[];
};
export declare type ThirdPartyGetRedirectionURLContext = AuthRecipeModuleGetRedirectionURLContext | {
    action: "GET_REDIRECT_URL";
    provider: Provider;
};
export declare type ThirdPartyPreAPIHookContext = AuthRecipeModulePreAPIHookContext | {
    action: "GET_AUTHORISATION_URL";
    requestInit: RequestInit;
    url: string;
};
export declare type ThirdPartyOnHandleEventContext = AuthRecipeModuleOnHandleEventContext;
export declare type SignInAndUpThemeProps = {
    providers: {
        id: string;
        buttonComponent: JSX.Element;
    }[];
    signInAndUpClick: (id: string) => Promise<string | void>;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
    status: "READY" | "LOADING" | "SUCCESSFUL" | "GENERAL_ERROR";
};
export declare type ThirdPartySignInAndUpThemeState = {
    status: "READY" | "LOADING" | "SUCCESSFUL";
} | {
    status: "GENERAL_ERROR";
    generalError: string;
};
export declare type SignInAndUpAPIResponse = {
    status: "OK";
    createdNewUser: boolean;
    user: User;
} | {
    status: "NO_EMAIL_GIVEN_BY_PROVIDER";
};
export declare type AuthorisationURLAPIResponse = {
    status: "OK";
    url: string;
};
export declare type ThirdPartySignInAndUpState = SignInAndUpState | {
    status: "GENERAL_ERROR";
};
export declare type StateObject = {
    state: string;
    expiresAt: number;
    rid: string;
    thirdPartyId: string;
};
