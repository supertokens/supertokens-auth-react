import ResetPasswordUsingTokenTheme from "../emailpassword/components/themes/resetPasswordUsingToken";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
import {
    RecipeInterface,
    EmailPasswordUserType as UserType,
    ThirdPartyUserType,
    RecipeFunctionOptions,
} from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { SignInAndUpCallbackTheme as ThirdPartySignInAndUpCallbackTheme } from "../thirdparty/components/themes/signInAndUpCallback";
import { StateObject } from "supertokens-web-js/recipe/thirdparty";
import { PropsWithChildren } from "react";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(input?: { userContext?: any }): Promise<void>;
    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK" | "RESET_PASSWORD_INVALID_TOKEN_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    static sendPasswordResetEmail(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    static emailPasswordSignUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: UserType;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
    >;
    static emailPasswordSignIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: UserType;
              fetchResponse: Response;
          }
        | {
              status: "FIELD_ERROR";
              formFields: {
                  id: string;
                  error: string;
              }[];
              fetchResponse: Response;
          }
        | {
              status: "WRONG_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
    >;
    static doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static getResetPasswordTokenFromURL(input?: { userContext?: any }): string;
    static redirectToThirdPartyLogin(input: { thirdPartyId: string; userContext?: any }): Promise<{
        status: "OK" | "ERROR";
    }>;
    static getAuthorisationURLFromBackend(input: {
        providerId: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        url: string;
        fetchResponse: Response;
    }>;
    static thirdPartySignInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: ThirdPartyUserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;
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
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
    static ResetPasswordUsingToken: (prop?: any) => JSX.Element;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static ThirdPartySignInAndUpCallbackTheme: import("react").ComponentType<{}>;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const SignInAndUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
declare const ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
declare const ResetPasswordUsingToken: (prop?: any) => JSX.Element;
declare const submitNewPassword: typeof Wrapper.submitNewPassword;
declare const sendPasswordResetEmail: typeof Wrapper.sendPasswordResetEmail;
declare const emailPasswordSignIn: typeof Wrapper.emailPasswordSignIn;
declare const emailPasswordSignUp: typeof Wrapper.emailPasswordSignUp;
declare const doesEmailExist: typeof Wrapper.doesEmailExist;
declare const getResetPasswordTokenFromURL: typeof Wrapper.getResetPasswordTokenFromURL;
declare const redirectToThirdPartyLogin: typeof Wrapper.redirectToThirdPartyLogin;
declare const getAuthorisationURLFromBackend: typeof Wrapper.getAuthorisationURLFromBackend;
declare const thirdPartySignInAndUp: typeof Wrapper.thirdPartySignInAndUp;
declare const getStateAndOtherInfoFromStorage: typeof Wrapper.getStateAndOtherInfoFromStorage;
declare const setStateAndOtherInfoToStorage: typeof Wrapper.setStateAndOtherInfoToStorage;
declare const getAuthorisationURLWithQueryParamsAndSetState: typeof Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
declare const generateStateToSendToOAuthProvider: typeof Wrapper.generateStateToSendToOAuthProvider;
declare const verifyAndGetStateOrThrowError: typeof Wrapper.verifyAndGetStateOrThrowError;
declare const getAuthCodeFromURL: typeof Wrapper.getAuthCodeFromURL;
declare const getAuthErrorFromURL: typeof Wrapper.getAuthErrorFromURL;
declare const getAuthStateFromURL: typeof Wrapper.getAuthStateFromURL;
export {
    init,
    Apple,
    Google,
    Facebook,
    Github,
    SignInAndUp,
    SignInAndUpTheme,
    ThirdPartySignInAndUpCallback,
    ThirdPartySignInAndUpCallbackTheme,
    signOut,
    submitNewPassword,
    sendPasswordResetEmail,
    emailPasswordSignIn,
    emailPasswordSignUp,
    doesEmailExist,
    getResetPasswordTokenFromURL,
    redirectToThirdPartyLogin,
    getAuthorisationURLFromBackend,
    thirdPartySignInAndUp,
    getStateAndOtherInfoFromStorage,
    setStateAndOtherInfoToStorage,
    getAuthorisationURLWithQueryParamsAndSetState,
    generateStateToSendToOAuthProvider,
    verifyAndGetStateOrThrowError,
    getAuthCodeFromURL,
    getAuthErrorFromURL,
    getAuthStateFromURL,
    ResetPasswordUsingToken,
    ResetPasswordUsingTokenTheme,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    UserType,
    ThirdPartyUserType,
};
