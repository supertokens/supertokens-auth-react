/// <reference types="react" />
import { UserInput } from "./types";
import EmailVerificationTheme from "./components/themes/emailVerification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, RecipeInterface } from "./types";
export default class Wrapper {
    static EmailVerification: (prop?: any) => JSX.Element;
    static EmailVerificationTheme: typeof EmailVerificationTheme;
    static init(
        config: UserInput
    ): import("../../types").CreateRecipeFunction<
        GetRedirectionURLContext,
        PreAPIHookContext,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static isEmailVerified(input?: { userContext?: any }): Promise<{
        status: "OK";
        isVerified: boolean;
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;
    static verifyEmail(input: { token: string; userContext?: any }): Promise<{
        status: "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR" | "OK";
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;
    static sendVerificationEmail(input?: { userContext?: any }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        networkResponse: {
            jsonBody: any;
            fetchResponse: Response;
        };
    }>;
}
declare const init: typeof Wrapper.init;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
declare const EmailVerification: (prop?: any) => JSX.Element;
export {
    init,
    isEmailVerified,
    EmailVerification,
    EmailVerificationTheme,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
