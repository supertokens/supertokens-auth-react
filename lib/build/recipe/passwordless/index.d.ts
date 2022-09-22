import { UserInput } from "./types";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import SignInUpThemeWrapper from "./components/themes/signInUp";
import { RecipeFunctionOptions, RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import { PasswordlessFlowType, PasswordlessUser } from "supertokens-web-js/recipe/passwordless/types";
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
    static createCode(
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
    static resendCode(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;
    static consumeCode(
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
    static getLinkCodeFromURL(input?: { userContext?: any }): string;
    static getPreAuthSessionIdFromURL(input?: { userContext?: any }): string;
    static doesEmailExist(input: { email: string; userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static doesPhoneNumberExist(input: {
        phoneNumber: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static getLoginAttemptInfo<CustomLoginAttemptInfoProperties>(input?: { userContext?: any }): Promise<
        | undefined
        | ({
              deviceId: string;
              preAuthSessionId: string;
              flowType: PasswordlessFlowType;
          } & CustomLoginAttemptInfoProperties)
    >;
    static setLoginAttemptInfo<CustomStateProperties>(input: {
        attemptInfo: {
            deviceId: string;
            preAuthSessionId: string;
            flowType: PasswordlessFlowType;
        } & CustomStateProperties;
        userContext?: any;
    }): Promise<void>;
    static clearLoginAttemptInfo(input?: { userContext?: any }): Promise<void>;
    static SignInUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static SignInUpTheme: typeof SignInUpThemeWrapper;
    static LinkClicked: (prop?: any) => JSX.Element;
}
declare const init: typeof Wrapper.init;
declare const createCode: typeof Wrapper.createCode;
declare const resendCode: typeof Wrapper.resendCode;
declare const consumeCode: typeof Wrapper.consumeCode;
declare const getLinkCodeFromURL: typeof Wrapper.getLinkCodeFromURL;
declare const getPreAuthSessionIdFromURL: typeof Wrapper.getPreAuthSessionIdFromURL;
declare const doesEmailExist: typeof Wrapper.doesEmailExist;
declare const doesPhoneNumberExist: typeof Wrapper.doesPhoneNumberExist;
declare const getLoginAttemptInfo: typeof Wrapper.getLoginAttemptInfo;
declare const setLoginAttemptInfo: typeof Wrapper.setLoginAttemptInfo;
declare const clearLoginAttemptInfo: typeof Wrapper.clearLoginAttemptInfo;
declare const signOut: typeof Wrapper.signOut;
declare const SignInUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
declare const SignInUpTheme: typeof SignInUpThemeWrapper;
declare const LinkClicked: (prop?: any) => JSX.Element;
export {
    SignInUp,
    SignInUpTheme,
    LinkClicked,
    init,
    createCode,
    resendCode,
    consumeCode,
    getLinkCodeFromURL,
    getPreAuthSessionIdFromURL,
    doesEmailExist,
    doesPhoneNumberExist,
    getLoginAttemptInfo,
    setLoginAttemptInfo,
    clearLoginAttemptInfo,
    signOut,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
