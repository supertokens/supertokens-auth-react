/// <reference types="react" />
import type { UserInput } from "./types";
import type { RegistrationResponseJSON } from "@simplewebauthn/types";
import type { AuthenticationResponseJSON } from "@simplewebauthn/types";
import type { RecipeFunctionOptions } from "supertokens-web-js/lib/build/recipe/recipeModule/types";
import type { AuthenticationOptions, UserVerification } from "supertokens-web-js/lib/build/recipe/webauthn/types";
import type { ResidentKey } from "supertokens-web-js/lib/build/recipe/webauthn/types";
import type { RegistrationOptions } from "supertokens-web-js/lib/build/recipe/webauthn/types";
import type { GeneralErrorResponse, User } from "supertokens-web-js/lib/build/types";
export default class Wrapper {
    static init(
        config?: UserInput
    ): import("../../types").RecipeInitResult<
        import("./types").GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        import("./types").OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static getRegisterOptions(
        input: {
            options?: RecipeFunctionOptions;
            userContext: any;
        } & (
            | {
                  email: string;
              }
            | {
                  recoverAccountToken: string;
              }
        )
    ): Promise<
        | {
              status: "OK";
              webauthnGeneratedOptionsId: string;
              createdAt: string;
              expiresAt: string;
              rp: {
                  id: string;
                  name: string;
              };
              user: {
                  id: string;
                  name: string;
                  displayName: string;
              };
              challenge: string;
              timeout: number;
              excludeCredentials: {
                  id: string;
                  type: "public-key";
                  transports: ("ble" | "hybrid" | "internal" | "nfc" | "usb")[];
              }[];
              attestation: "none" | "indirect" | "direct" | "enterprise";
              pubKeyCredParams: {
                  alg: number;
                  type: "public-key";
              }[];
              authenticatorSelection: {
                  requireResidentKey: boolean;
                  residentKey: ResidentKey;
                  userVerification: UserVerification;
              };
              fetchResponse: Response;
          }
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_EMAIL_ERROR";
              err: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
    >;
    static getSignInOptions(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<
        | {
              status: "OK";
              webauthnGeneratedOptionsId: string;
              challenge: string;
              timeout: number;
              userVerification: UserVerification;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    >;
    static signUp(input: {
        webauthnGeneratedOptionsId: string;
        credential: RegistrationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "EMAIL_ALREADY_EXISTS_ERROR";
              fetchResponse: Response;
          }
    >;
    static signIn(input: {
        webauthnGeneratedOptionsId: string;
        credential: AuthenticationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    >;
    static getEmailExists(input: { email: string; options?: RecipeFunctionOptions; userContext: any }): Promise<
        | {
              status: "OK";
              exists: boolean;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    >;
    static generateRecoverAccountToken(input: {
        email: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              fetchResponse: Response;
          }
        | {
              status: "RECOVER_ACCOUNT_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
    >;
    static recoverAccount(input: {
        token: string;
        webauthnGeneratedOptionsId: string;
        credential: RegistrationResponseJSON;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              email: string;
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
    >;
    static registerCredential(input: {
        registrationOptions: Omit<RegistrationOptions, "fetchResponse" | "status">;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              registrationResponse: RegistrationResponseJSON;
          }
        | {
              status: "AUTHENTICATOR_ALREADY_REGISTERED";
          }
        | {
              status: "FAILED_TO_REGISTER_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
    >;
    static authenticateCredential(input: {
        authenticationOptions: Omit<AuthenticationOptions, "fetchResponse" | "status">;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              authenticationResponse: AuthenticationResponseJSON;
          }
        | {
              status: "FAILED_TO_AUTHENTICATE_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
    >;
    static registerCredentialWithSignUp(input: {
        email: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_EMAIL_ERROR";
              err: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "SIGN_UP_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "EMAIL_ALREADY_EXISTS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "AUTHENTICATOR_ALREADY_REGISTERED";
          }
        | {
              status: "FAILED_TO_REGISTER_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
    >;
    static authenticateCredentialWithSignIn(input: { options?: RecipeFunctionOptions; userContext: any }): Promise<
        | {
              status: "OK";
              user: User;
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "SIGN_IN_NOT_ALLOWED";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "FAILED_TO_AUTHENTICATE_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
        | GeneralErrorResponse
    >;
    static registerCredentialWithRecoverAccount(input: {
        recoverAccountToken: string;
        options?: RecipeFunctionOptions;
        userContext: any;
    }): Promise<
        | {
              status: "OK";
              user: User;
              email: string;
              fetchResponse: Response;
          }
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_GENERATED_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | GeneralErrorResponse
        | {
              status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_CREDENTIALS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "OPTIONS_NOT_FOUND_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_OPTIONS_ERROR";
              fetchResponse: Response;
          }
        | {
              status: "INVALID_AUTHENTICATOR_ERROR";
              reason: string;
              fetchResponse: Response;
          }
        | {
              status: "AUTHENTICATOR_ALREADY_REGISTERED";
          }
        | {
              status: "FAILED_TO_REGISTER_USER";
              error: any;
          }
        | {
              status: "WEBAUTHN_NOT_SUPPORTED";
              error: any;
          }
    >;
    static doesBrowserSupportWebAuthn(input: { userContext: any }): Promise<
        | {
              status: "OK";
              browserSupportsWebauthn: boolean;
              platformAuthenticatorIsAvailable: boolean;
          }
        | {
              status: "ERROR";
              error: any;
          }
    >;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const getRegisterOptions: typeof Wrapper.getRegisterOptions;
declare const getSignInOptions: typeof Wrapper.getSignInOptions;
declare const signUp: typeof Wrapper.signUp;
declare const signIn: typeof Wrapper.signIn;
declare const getEmailExists: typeof Wrapper.getEmailExists;
declare const generateRecoverAccountToken: typeof Wrapper.generateRecoverAccountToken;
declare const recoverAccount: typeof Wrapper.recoverAccount;
declare const registerCredential: typeof Wrapper.registerCredential;
declare const authenticateCredential: typeof Wrapper.authenticateCredential;
declare const registerCredentialWithSignUp: typeof Wrapper.registerCredentialWithSignUp;
declare const authenticateCredentialWithSignIn: typeof Wrapper.authenticateCredentialWithSignIn;
declare const registerCredentialWithRecoverAccount: typeof Wrapper.registerCredentialWithRecoverAccount;
declare const doesBrowserSupportWebAuthn: typeof Wrapper.doesBrowserSupportWebAuthn;
declare const WebauthnComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
export {
    init,
    getRegisterOptions,
    getSignInOptions,
    signUp,
    signIn,
    getEmailExists,
    generateRecoverAccountToken,
    recoverAccount,
    registerCredential,
    authenticateCredential,
    registerCredentialWithSignUp,
    authenticateCredentialWithSignIn,
    registerCredentialWithRecoverAccount,
    doesBrowserSupportWebAuthn,
    WebauthnComponentsOverrideProvider,
};
