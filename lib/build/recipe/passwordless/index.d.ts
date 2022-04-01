/// <reference types="react" />
import { UserInput } from "./types";
import PasswordlessAuth from "./passwordlessAuth";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import SignInUpThemeWrapper from "./components/themes/signInUp";
import { RecipeFunctionOptions, RecipeInterface } from "supertokens-web-js/recipe/passwordless";
import { PasswordlessFlowType, PasswordlessUser } from "supertokens-web-js/lib/build/recipe/passwordless/types";
export default class Wrapper {
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        import("../authRecipe/types").GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(): Promise<void>;
    static redirectToAuth(
        input?:
            | ("signin" | "signup")
            | {
                  show?: "signin" | "signup";
                  redirectBack?: boolean;
              }
    ): Promise<void>;
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
    static resendCode(input: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "RESTART_FLOW_ERROR";
        fetchResponse: Response;
    }>;
    static consumeCode(
        input:
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
              createdUser: boolean;
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
    static PasswordlessAuth: typeof PasswordlessAuth;
    static SignInUp: (prop?: any) => JSX.Element;
    static SignInUpTheme: typeof SignInUpThemeWrapper;
    static LinkClicked: (prop?: any) => JSX.Element;
}
declare const init: typeof Wrapper.init;
declare const createCode: typeof Wrapper.createCode;
declare const resendCode: typeof Wrapper.resendCode;
declare const consumeCode: typeof Wrapper.consumeCode;
declare const doesEmailExist: typeof Wrapper.doesEmailExist;
declare const doesPhoneNumberExist: typeof Wrapper.doesPhoneNumberExist;
declare const signOut: typeof Wrapper.signOut;
declare const redirectToAuth: typeof Wrapper.redirectToAuth;
declare const SignInUp: (prop?: any) => JSX.Element;
declare const SignInUpTheme: typeof SignInUpThemeWrapper;
declare const LinkClicked: (prop?: any) => JSX.Element;
export {
    PasswordlessAuth,
    SignInUp,
    SignInUpTheme,
    LinkClicked,
    init,
    createCode,
    resendCode,
    consumeCode,
    doesEmailExist,
    doesPhoneNumberExist,
    signOut,
    redirectToAuth,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
