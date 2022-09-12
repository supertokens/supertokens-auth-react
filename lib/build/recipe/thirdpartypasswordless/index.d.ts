import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import SignInUpTheme from "./components/themes/signInUp";
import { Apple, Google, Facebook, Github } from "../thirdparty/";
import {
    PasswordlessFlowType,
    PasswordlessUser,
    RecipeFunctionOptions,
    RecipeInterface,
} from "supertokens-web-js/recipe/thirdpartypasswordless";
import { StateObject, ThirdPartyUserType as UserType } from "supertokens-web-js/recipe/thirdparty";
import { PropsWithChildren } from "react";
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
              user: UserType;
              createdNewUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
    >;
    static getThirdPartyStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined;
    static setThirdPartyStateAndOtherInfoToStorage<CustomStateProperties>(input: {
        state: StateObject & CustomStateProperties;
        userContext?: any;
    }): Promise<void>;
    static getThirdPartyAuthorisationURLWithQueryParamsAndSetState(input: {
        providerId: string;
        authorisationURL: string;
        userContext?: any;
        providerClientId?: string;
        options?: RecipeFunctionOptions;
    }): Promise<string>;
    static generateThirdPartyStateToSendToOAuthProvider(input?: { userContext?: any }): string;
    static verifyAndGetThirdPartyStateOrThrowError<CustomStateProperties>(input: {
        stateFromAuthProvider: string | undefined;
        stateObjectFromStorage: (StateObject & CustomStateProperties) | undefined;
        userContext?: any;
    }): Promise<StateObject & CustomStateProperties>;
    static getThirdPartyAuthCodeFromURL(input?: { userContext?: any }): string;
    static getThirdPartyAuthErrorFromURL(input?: { userContext?: any }): string | undefined;
    static getThirdPartyAuthStateFromURL(input?: { userContext?: any }): string;
    static createPasswordlessCode(
        input:
            | {
                  email: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  phoneNumber: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<{
        status: "OK";
        deviceId: string;
        preAuthSessionId: string;
        flowType: PasswordlessFlowType;
        fetchResponse: Response;
    }>;
    static resendPasswordlessCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;
    static consumePasswordlessCode(
        input?:
            | {
                  userInputCode: string;
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
            | {
                  userContext?: any;
                  options?: RecipeFunctionOptions;
              }
    ): Promise<
        | {
              status: "OK";
              createdNewUser: boolean;
              user: PasswordlessUser;
              fetchResponse: Response;
          }
        | {
              status: "INCORRECT_USER_INPUT_CODE_ERROR" | "EXPIRED_USER_INPUT_CODE_ERROR";
              failedCodeInputAttemptCount: number;
              maximumCodeInputAttempts: number;
              fetchResponse: Response;
          }
        | {
              status: "RESTART_FLOW_ERROR";
              fetchResponse: Response;
          }
    >;
    static getPasswordlessLinkCodeFromURL(input?: { userContext?: any }): string;
    static getPasswordlessPreAuthSessionIdFromURL(input?: { userContext?: any }): string;
    static doesPasswordlessUserEmailExist(input: {
        email: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static doesPasswordlessUserPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static getPasswordlessLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: { userContext?: any }): Promise<
        | undefined
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    >;
    static setPasswordlessLoginAttemptInfo<CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext?: any;
    }): Promise<void>;
    static clearPasswordlessLoginAttemptInfo(input?: { userContext?: any }): Promise<void>;
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
    static SignInAndUpTheme: typeof SignInUpTheme;
    static ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
    static PasswordlessLinkClickedTheme: import("react").ComponentType<
        import("../passwordless/types").LinkClickedScreenProps & {
            children?: import("react").ReactNode;
        }
    >;
    static PasswordlessLinkClicked: (prop?: any) => JSX.Element;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const redirectToThirdPartyLogin: typeof Wrapper.redirectToThirdPartyLogin;
declare const getAuthorisationURLFromBackend: typeof Wrapper.getAuthorisationURLFromBackend;
declare const thirdPartySignInAndUp: typeof Wrapper.thirdPartySignInAndUp;
declare const getThirdPartyStateAndOtherInfoFromStorage: typeof Wrapper.getThirdPartyStateAndOtherInfoFromStorage;
declare const setThirdPartyStateAndOtherInfoToStorage: typeof Wrapper.setThirdPartyStateAndOtherInfoToStorage;
declare const getThirdPartyAuthorisationURLWithQueryParamsAndSetState: typeof Wrapper.getThirdPartyAuthorisationURLWithQueryParamsAndSetState;
declare const generateThirdPartyStateToSendToOAuthProvider: typeof Wrapper.generateThirdPartyStateToSendToOAuthProvider;
declare const verifyAndGetThirdPartyStateOrThrowError: typeof Wrapper.verifyAndGetThirdPartyStateOrThrowError;
declare const getThirdPartyAuthCodeFromURL: typeof Wrapper.getThirdPartyAuthCodeFromURL;
declare const getThirdPartyAuthErrorFromURL: typeof Wrapper.getThirdPartyAuthErrorFromURL;
declare const getThirdPartyAuthStateFromURL: typeof Wrapper.getThirdPartyAuthStateFromURL;
declare const createPasswordlessCode: typeof Wrapper.createPasswordlessCode;
declare const resendPasswordlessCode: typeof Wrapper.resendPasswordlessCode;
declare const consumePasswordlessCode: typeof Wrapper.consumePasswordlessCode;
declare const getPasswordlessLinkCodeFromURL: typeof Wrapper.getPasswordlessLinkCodeFromURL;
declare const getPasswordlessPreAuthSessionIdFromURL: typeof Wrapper.getPasswordlessPreAuthSessionIdFromURL;
declare const doesPasswordlessUserEmailExist: typeof Wrapper.doesPasswordlessUserEmailExist;
declare const doesPasswordlessUserPhoneNumberExist: typeof Wrapper.doesPasswordlessUserPhoneNumberExist;
declare const getPasswordlessLoginAttemptInfo: typeof Wrapper.getPasswordlessLoginAttemptInfo;
declare const setPasswordlessLoginAttemptInfo: typeof Wrapper.setPasswordlessLoginAttemptInfo;
declare const clearPasswordlessLoginAttemptInfo: typeof Wrapper.clearPasswordlessLoginAttemptInfo;
declare const SignInAndUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
declare const ThirdPartySignInAndUpCallback: (prop?: any) => JSX.Element;
declare const PasswordlessLinkClicked: (prop?: any) => JSX.Element;
export {
    init,
    Apple,
    Google,
    Facebook,
    Github,
    redirectToThirdPartyLogin,
    getAuthorisationURLFromBackend,
    thirdPartySignInAndUp,
    getThirdPartyStateAndOtherInfoFromStorage,
    setThirdPartyStateAndOtherInfoToStorage,
    getThirdPartyAuthorisationURLWithQueryParamsAndSetState,
    generateThirdPartyStateToSendToOAuthProvider,
    verifyAndGetThirdPartyStateOrThrowError,
    getThirdPartyAuthCodeFromURL,
    getThirdPartyAuthErrorFromURL,
    getThirdPartyAuthStateFromURL,
    createPasswordlessCode,
    resendPasswordlessCode,
    consumePasswordlessCode,
    getPasswordlessLinkCodeFromURL,
    getPasswordlessPreAuthSessionIdFromURL,
    doesPasswordlessUserEmailExist,
    doesPasswordlessUserPhoneNumberExist,
    getPasswordlessLoginAttemptInfo,
    setPasswordlessLoginAttemptInfo,
    clearPasswordlessLoginAttemptInfo,
    SignInAndUp,
    SignInUpTheme,
    ThirdPartySignInAndUpCallback,
    signOut,
    PasswordlessLinkClicked,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
