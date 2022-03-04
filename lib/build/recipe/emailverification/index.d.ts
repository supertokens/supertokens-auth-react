/// <reference types="react" />
import { UserInput } from "./types";
import EmailVerificationTheme from "./components/themes/emailVerification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
export default class Wrapper {
    static EmailVerification: (prop?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static isEmailVerified(input?: { userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    static verifyEmail(input: { userContext?: any }): Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        fetchResponse: Response;
    }>;
    static sendVerificationEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;
}
declare const init: typeof Wrapper.init;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
declare const verifyEmail: typeof Wrapper.verifyEmail;
declare const sendVerificationEmail: typeof Wrapper.sendVerificationEmail;
declare const EmailVerification: (prop?: any) => JSX.Element;
export {
    init,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    EmailVerification,
    EmailVerificationTheme,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
