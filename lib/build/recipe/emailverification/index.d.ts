/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import EmailVerificationTheme from "./components/themes/emailVerification";
import { UserInput } from "./types";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/emailverification";
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
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const isEmailVerified: typeof Wrapper.isEmailVerified;
declare const verifyEmail: typeof Wrapper.verifyEmail;
declare const sendVerificationEmail: typeof Wrapper.sendVerificationEmail;
declare const EmailVerification: (prop?: any) => JSX.Element;
declare const getEmailVerificationTokenFromURL: typeof Wrapper.getEmailVerificationTokenFromURL;
declare const EmailVerificationComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
declare const EmailVerificationClaim: import("supertokens-web-js/recipe/emailverification").EmailVerificationClaimClass;
export {
    init,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    getEmailVerificationTokenFromURL,
    EmailVerification,
    EmailVerificationTheme,
    EmailVerificationComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    EmailVerificationClaim,
};
