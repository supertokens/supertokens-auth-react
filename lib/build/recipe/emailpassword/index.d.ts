import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import ResetPasswordUsingTokenTheme from "./components/themes/resetPasswordUsingToken";
import SignInAndUpTheme from "./components/themes/signInAndUp";
import { UserInput } from "./types";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import type { User } from "../authRecipe/types";
import type { PropsWithChildren } from "react";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/emailpassword";
export default class Wrapper {
    static init(
        config?: UserInput
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
    static signUp(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
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
    static signIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
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
    static SignInAndUp: (
        prop?: PropsWithChildren<{
            redirectOnSessionExists?: boolean;
            userContext?: any;
        }>
    ) => JSX.Element;
    static SignInAndUpTheme: typeof SignInAndUpTheme;
    static ResetPasswordUsingToken: (prop?: any) => JSX.Element;
    static ResetPasswordUsingTokenTheme: typeof ResetPasswordUsingTokenTheme;
    static ComponentsOverrideProvider: import("react").FC<
        PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const submitNewPassword: typeof Wrapper.submitNewPassword;
declare const sendPasswordResetEmail: typeof Wrapper.sendPasswordResetEmail;
declare const signUp: typeof Wrapper.signUp;
declare const signIn: typeof Wrapper.signIn;
declare const doesEmailExist: typeof Wrapper.doesEmailExist;
declare const SignInAndUp: (
    prop?: PropsWithChildren<{
        redirectOnSessionExists?: boolean;
        userContext?: any;
    }>
) => JSX.Element;
declare const getResetPasswordTokenFromURL: typeof Wrapper.getResetPasswordTokenFromURL;
declare const ResetPasswordUsingToken: (prop?: any) => JSX.Element;
declare const EmailPasswordComponentsOverrideProvider: import("react").FC<
    PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
export {
    init,
    SignInAndUp,
    SignInAndUpTheme,
    signOut,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    getResetPasswordTokenFromURL,
    ResetPasswordUsingToken,
    ResetPasswordUsingTokenTheme,
    EmailPasswordComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
