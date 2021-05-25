/// <reference types="react" />
import { FeatureBaseConfig, NormalisedBaseConfig } from "../../types";
import { GetRedirectionURLContext as AuthRecipeModuleGetRedirectionURLContext, OnHandleEventContext as AuthRecipeModuleOnHandleEventContext, PreAPIHookContext as AuthRecipeModulePreAPIHookContext, User, Config as AuthRecipeModuleConfig, NormalisedConfig as NormalisedAuthRecipeModuleConfig } from "../authRecipeModule/types";
import Provider from "./providers";
import { CustomProviderConfig } from "./providers/types";
export declare type UserInput = {
    signInAndUpFeature: SignInAndUpFeatureUserInput;
};
export declare type Config = UserInput & AuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
export declare type NormalisedConfig = {
    signInAndUpFeature: NormalisedSignInAndUpFeatureConfig;
} & NormalisedAuthRecipeModuleConfig<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext>;
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
export declare type GetRedirectionURLContext = AuthRecipeModuleGetRedirectionURLContext | {
    action: "GET_REDIRECT_URL";
    provider: Provider;
};
export declare type PreAPIHookContext = AuthRecipeModulePreAPIHookContext | {
    action: "GET_AUTHORISATION_URL";
    requestInit: RequestInit;
    url: string;
};
export declare type OnHandleEventContext = AuthRecipeModuleOnHandleEventContext;
export declare type SignInAndUpThemeProps = {
    providers: {
        id: string;
        buttonComponent: JSX.Element;
    }[];
    signInAndUpClick: (id: string) => Promise<string | void>;
    privacyPolicyLink?: string;
    termsOfServiceLink?: string;
} & ({
    status: "READY" | "LOADING" | "SUCCESSFUL" | "GENERAL_ERROR";
} | {
    status: "CUSTOM_ERROR";
    error: string;
});
export declare type ThirdPartySignInAndUpThemeState = {
    status: "READY" | "LOADING" | "SUCCESSFUL";
} | {
    status: "ERROR";
    message: string;
};
export declare type SignInAndUpAPIResponse = {
    status: "OK";
    createdNewUser: boolean;
    user: User;
} | {
    status: "NO_EMAIL_GIVEN_BY_PROVIDER";
} | {
    status: "FIELD_ERROR";
    error: string;
};
export declare type AuthorisationURLAPIResponse = {
    status: "OK";
    url: string;
};
export declare type ThirdPartySignInAndUpState = {
    status: "LOADING" | "READY" | "GENERAL_ERROR";
} | {
    status: "SUCCESSFUL";
    user: User;
} | {
    status: "CUSTOM_ERROR";
    error: string;
};
export declare type StateObject = {
    state: string;
    expiresAt: number;
    rid: string;
    thirdPartyId: string;
    redirectToPath: string | undefined;
};
