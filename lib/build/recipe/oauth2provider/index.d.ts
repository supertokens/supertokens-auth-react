/// <reference types="react" />
import { RecipeComponentsOverrideContextProvider } from "./componentOverrideContext";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import type { RecipeFunctionOptions, LoginInfo } from "supertokens-web-js/recipe/oauth2provider";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2provider";
export default class Wrapper {
    static init(
        config?: UserInput
    ): import("../../types").RecipeInitResult<
        GetRedirectionURLContext,
        import("./types").PreAndPostAPIHookAction,
        OnHandleEventContext,
        import("./types").NormalisedConfig
    >;
    /**
     * Returns information about an OAuth login in progress
     *
     * @param loginChallenge The login challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", info: LoginInfo}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getLoginChallengeInfo(input: {
        loginChallenge: string;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<{
        status: "OK";
        info: LoginInfo;
        fetchResponse: Response;
    }>;
    /**
     * Accepts the OAuth2 Login request and returns the redirect URL to continue the OAuth flow.
     *
     * @param loginChallenge The login challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", frontendRedirectTo: string}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static getRedirectURLToContinueOAuthFlow(input: {
        loginChallenge: string;
        options?: RecipeFunctionOptions;
        userContext?: any;
    }): Promise<{
        status: "OK";
        frontendRedirectTo: string;
        fetchResponse: Response;
    }>;
    /**
     * Accepts the OAuth2 Logout request, clears the SuperTokens session and returns post logout redirect URL.
     *
     * @param logoutChallenge The logout challenge from the url
     *
     * @param userContext (OPTIONAL) Refer to {@link https://supertokens.com/docs/emailpassword/advanced-customizations/user-context the documentation}
     *
     * @param options (OPTIONAL) Use this to configure additional properties (for example pre api hooks)
     *
     * @returns `{status: "OK", frontendRedirectTo: string}`
     *
     * @throws STGeneralError if the API exposed by the backend SDKs returns `status: "GENERAL_ERROR"`
     */
    static logOut(input: { logoutChallenge: string; options?: RecipeFunctionOptions; userContext?: any }): Promise<{
        status: "OK";
        frontendRedirectTo: string;
        fetchResponse: Response;
    }>;
    static ComponentsOverrideProvider: import("react").FC<
        import("react").PropsWithChildren<{
            components: import("./types").ComponentOverrideMap;
        }>
    >;
}
declare const init: typeof Wrapper.init;
declare const getLoginChallengeInfo: typeof Wrapper.getLoginChallengeInfo;
declare const logOut: typeof Wrapper.logOut;
export {
    init,
    getLoginChallengeInfo,
    logOut,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    RecipeComponentsOverrideContextProvider,
};
