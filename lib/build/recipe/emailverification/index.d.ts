/// <reference types="react" />
import { UserInput } from "./types";
import EmailVerificationTheme from "./components/themes/emailVerification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { RecipeFunctionOptions, RecipeInterface } from "supertokens-web-js/recipe/emailverification";
export default class Wrapper {
    static EmailVerification: (prop?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
    static EmailVerificationClaim: import("supertokens-web-js/recipe/emailverification").EmailVerificationClaimClass;
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static isEmailVerified(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    static verifyEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }>;
    static sendVerificationEmail(input?: { userContext?: any; options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;
    static getEmailVerificationTokenFromURL(input?: { userContext?: any }): string;
}
declare const init: typeof Wrapper.init;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
declare const verifyEmail: typeof Wrapper.verifyEmail;
declare const sendVerificationEmail: typeof Wrapper.sendVerificationEmail;
declare const EmailVerification: (prop?: any) => JSX.Element;
declare const getEmailVerificationTokenFromURL: typeof Wrapper.getEmailVerificationTokenFromURL;
declare const EmailVerificationClaim: import("supertokens-web-js/recipe/emailverification").EmailVerificationClaimClass;
export {
    init,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    getEmailVerificationTokenFromURL,
    EmailVerification,
    EmailVerificationTheme,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    EmailVerificationClaim,
};
