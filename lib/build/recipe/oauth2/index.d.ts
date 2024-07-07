import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import type { RecipeFunctionOptions, LoginInfo } from "supertokens-web-js/recipe/oauth2";
import type { RecipeInterface } from "supertokens-web-js/recipe/oauth2";
export default class Wrapper {
    static init(config?: UserInput): import("../../types").RecipeInitResult<any, never, any, any>;
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
}
declare const init: typeof Wrapper.init;
declare const getLoginChallengeInfo: typeof Wrapper.getLoginChallengeInfo;
export {
    init,
    getLoginChallengeInfo,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
