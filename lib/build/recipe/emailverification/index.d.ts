/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
import { GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import { UserInput } from "./types";
import type { UserContext } from "../../types";
import type { RecipeFunctionOptions } from "supertokens-web-js/recipe/emailverification";
export default class Wrapper {
    static EmailVerificationClaim: import("./emailVerificationClaim").EmailVerificationClaimClass;
    static init(
        config?: UserInput
    ): import("../../types").RecipeInitResult<
        GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    static isEmailVerified(input?: { userContext?: UserContext; options?: RecipeFunctionOptions }): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    static verifyEmail(input?: { userContext?: UserContext; options?: RecipeFunctionOptions }): Promise<{
        status: "OK" | "EMAIL_VERIFICATION_INVALID_TOKEN_ERROR";
        fetchResponse: Response;
    }>;
    static sendVerificationEmail(input?: { userContext?: UserContext; options?: RecipeFunctionOptions }): Promise<{
        status: "EMAIL_ALREADY_VERIFIED_ERROR" | "OK";
        fetchResponse: Response;
    }>;
    static getEmailVerificationTokenFromURL(input?: { userContext?: UserContext }): string;
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
declare const getEmailVerificationTokenFromURL: typeof Wrapper.getEmailVerificationTokenFromURL;
declare const EmailVerificationComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
declare const EmailVerificationClaim: import("./emailVerificationClaim").EmailVerificationClaimClass;
export {
    init,
    isEmailVerified,
    verifyEmail,
    sendVerificationEmail,
    getEmailVerificationTokenFromURL,
    EmailVerificationComponentsOverrideProvider,
    GetRedirectionURLContext,
    PreAPIHookContext as PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    EmailVerificationClaim,
};
