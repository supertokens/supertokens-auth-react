/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/thirdpartyemailpassword";
import {
    Apple,
    Google,
    GoogleWorkspaces,
    Facebook,
    Github,
    Gitlab,
    Bitbucket,
    Discord,
    LinkedIn,
    ActiveDirectory,
    BoxySAML,
    Okta,
    Twitter,
} from "../thirdparty/";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import type { StateObject } from "supertokens-web-js/recipe/thirdparty";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/thirdpartyemailpassword";
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
        userContext?: any;
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
    static doesEmailExist(input: { email: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        doesExist: boolean;
        fetchResponse: Response;
    }>;
    static getResetPasswordTokenFromURL(input?: { userContext?: any }): string;
    static redirectToThirdPartyLogin(input: { thirdPartyId: string; userContext?: any }): Promise<{
        status: "OK" | "ERROR";
    }>;
    static thirdPartySignInAndUp(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<
        | {
              status: "OK";
              user: User;
              createdNewRecipeUser: boolean;
              fetchResponse: Response;
          }
        | {
              status: "NO_EMAIL_GIVEN_BY_PROVIDER";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
    >;
    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: any;
    }): (StateObject & CustomStateProperties) | undefined;
    static getAuthorisationURLWithQueryParamsAndSetState(input: {
        thirdPartyId: string;
        frontendRedirectURI: string;
        redirectURIOnProviderDashboard?: string;
        userContext?: any;
        options?: RecipeFunctionOptions;
    }): Promise<string>;
    static Google: typeof Google;
    static GoogleWorkspaces: typeof GoogleWorkspaces;
    static Apple: typeof Apple;
    static Bitbucket: typeof Bitbucket;
    static Discord: typeof Discord;
    static Github: typeof Github;
    static Gitlab: typeof Gitlab;
    static Facebook: typeof Facebook;
    static LinkedIn: typeof LinkedIn;
    static ActiveDirectory: typeof ActiveDirectory;
    static BoxySAML: typeof BoxySAML;
    static Okta: typeof Okta;
    static Twitter: typeof Twitter;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const signOut: typeof Wrapper.signOut;
declare const ThirdpartyEmailPasswordComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
declare const submitNewPassword: typeof Wrapper.submitNewPassword;
declare const sendPasswordResetEmail: typeof Wrapper.sendPasswordResetEmail;
declare const emailPasswordSignIn: typeof Wrapper.emailPasswordSignIn;
declare const emailPasswordSignUp: typeof Wrapper.emailPasswordSignUp;
declare const doesEmailExist: typeof Wrapper.doesEmailExist;
declare const getResetPasswordTokenFromURL: typeof Wrapper.getResetPasswordTokenFromURL;
declare const redirectToThirdPartyLogin: typeof Wrapper.redirectToThirdPartyLogin;
declare const thirdPartySignInAndUp: typeof Wrapper.thirdPartySignInAndUp;
declare const getStateAndOtherInfoFromStorage: typeof Wrapper.getStateAndOtherInfoFromStorage;
declare const getAuthorisationURLWithQueryParamsAndSetState: typeof Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
export {
    init,
    Apple,
    Bitbucket,
    Discord,
    Github,
    Gitlab,
    Google,
    GoogleWorkspaces,
    Facebook,
    LinkedIn,
    ActiveDirectory,
    BoxySAML,
    Okta,
    Twitter,
    ThirdpartyEmailPasswordComponentsOverrideProvider,
    signOut,
    submitNewPassword,
    sendPasswordResetEmail,
    emailPasswordSignIn,
    emailPasswordSignUp,
    doesEmailExist,
    getResetPasswordTokenFromURL,
    redirectToThirdPartyLogin,
    thirdPartySignInAndUp,
    getStateAndOtherInfoFromStorage,
    getAuthorisationURLWithQueryParamsAndSetState,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
