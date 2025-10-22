/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/emailpassword";
import { UserInput } from "./types";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import type { UserContext } from "../../types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/emailpassword";
import type { User } from "supertokens-web-js/types";
export default class Wrapper {
    static init(
        config?: UserInput
    ): import("../../types").RecipeInitResult<
        GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static signOut(input?: { userContext?: UserContext }): Promise<void>;
    static submitNewPassword(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        options?: RecipeFunctionOptions;
        userContext?: UserContext;
    }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "RESET_PASSWORD_INVALID_TOKEN_ERROR";
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
        userContext?: UserContext;
    }): Promise<
        | {
              status: "OK" | "PASSWORD_RESET_NOT_ALLOWED";
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
        shouldTryLinkingWithSessionUser?: boolean;
        options?: RecipeFunctionOptions;
        userContext?: UserContext;
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
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    >;
    static signIn(input: {
        formFields: {
            id: string;
            value: string;
        }[];
        shouldTryLinkingWithSessionUser?: boolean;
        options?: RecipeFunctionOptions;
        userContext?: UserContext;
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
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    >;
    static doesEmailExist(input: {
        email: string;
        options?: RecipeFunctionOptions;
        userContext?: UserContext;
    }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static getResetPasswordTokenFromURL(input?: { userContext?: UserContext }): string;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
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
declare const getResetPasswordTokenFromURL: typeof Wrapper.getResetPasswordTokenFromURL;
declare const EmailPasswordComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
export {
    init,
    signOut,
    submitNewPassword,
    sendPasswordResetEmail,
    signUp,
    signIn,
    doesEmailExist,
    getResetPasswordTokenFromURL,
    EmailPasswordComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
