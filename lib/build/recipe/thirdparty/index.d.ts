import { RecipeInterface, ThirdPartyUserType as User } from "supertokens-web-js/recipe/thirdparty";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { SignInAndUpCallbackTheme } from "./components/themes/signInAndUpCallback";
import Apple from "./providers/apple";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
import Google from "./providers/google";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import type { PropsWithChildren } from "react";
import type { StateObject } from "supertokens-web-js/recipe/thirdparty";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/thirdpartyemailpassword";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        import("../authRecipe/types").GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(input?: { userContext?: any }): Promise<void>;
    static redirectToThirdPartyLogin(input: { thirdPartyId: string; userContext?: any }): Promise<{
        status: "OK" | "ERROR";
    }>;
    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined;
    static setStateAndOtherInfoToStorage<CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext?: any;
    }): Promise<void>;
    static getAuthorisationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        providerClientId?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<string>;
    static getAuthorisationURLFromBackend(input: {
        providerId: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    static signInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: User;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;
    static generateStateToSendToOAuthProvider(input?: { userContext?: any }): string;
    static verifyAndGetStateOrThrowError<CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext?: any;
    }): Promise<StateObject & CustomStateProperties>;
    static getAuthCodeFromURL(input?: { userContext?: any }): string;
    static getAuthErrorFromURL(input?: { userContext?: any }): string | undefined;
    static getAuthStateFromURL(input?: { userContext?: any }): string;
    static Google: typeof Google;
    static Apple: typeof Apple;
    static Facebook: typeof Facebook;
    static Github: typeof Github;
    static SignInAndUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static SignInAndUpTheme: import("react").FC<import("./types").SignInAndUpThemeProps>;
    static SignInAndUpCallback: (prop?: any) => JSX.Element;
    static SignInAndUpCallbackTheme: (props: { config: import("./types").NormalisedConfig }) => JSX.Element;
    static ComponentsOverrideProvider: import("react").FC<
        PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const redirectToThirdPartyLogin: typeof Wrapper.redirectToThirdPartyLogin;
declare const getStateAndOtherInfoFromStorage: typeof Wrapper.getStateAndOtherInfoFromStorage;
declare const setStateAndOtherInfoToStorage: typeof Wrapper.setStateAndOtherInfoToStorage;
declare const getAuthorisationURLWithQueryParamsAndSetState: typeof Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
declare const getAuthorisationURLFromBackend: typeof Wrapper.getAuthorisationURLFromBackend;
declare const generateStateToSendToOAuthProvider: typeof Wrapper.generateStateToSendToOAuthProvider;
declare const verifyAndGetStateOrThrowError: typeof Wrapper.verifyAndGetStateOrThrowError;
declare const getAuthCodeFromURL: typeof Wrapper.getAuthCodeFromURL;
declare const getAuthErrorFromURL: typeof Wrapper.getAuthErrorFromURL;
declare const getAuthStateFromURL: typeof Wrapper.getAuthStateFromURL;
declare const signInAndUp: typeof Wrapper.signInAndUp;
declare const SignInAndUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
declare const SignInAndUpCallback: (prop?: any) => JSX.Element;
declare const ThirdpartyComponentsOverrideProvider: import("react").FC<
    PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
export {
    init,
    Apple,
    Google,
    Facebook,
    Github,
    getStateAndOtherInfoFromStorage,
    setStateAndOtherInfoToStorage,
    getAuthorisationURLWithQueryParamsAndSetState,
    getAuthorisationURLFromBackend,
    generateStateToSendToOAuthProvider,
    verifyAndGetStateOrThrowError,
    getAuthCodeFromURL,
    getAuthErrorFromURL,
    getAuthStateFromURL,
    signInAndUp,
    redirectToThirdPartyLogin,
    SignInAndUp,
    SignInAndUpTheme,
    SignInAndUpCallback,
    SignInAndUpCallbackTheme,
    ThirdpartyComponentsOverrideProvider,
    signOut,
    User,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
