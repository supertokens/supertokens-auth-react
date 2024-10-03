/// <reference types="react" />
import { RecipeInterface } from "supertokens-web-js/recipe/thirdparty";
import ActiveDirectory from "./providers/activeDirectory";
import Apple from "./providers/apple";
import Bitbucket from "./providers/bitbucket";
import BoxySAML from "./providers/boxySaml";
import Discord from "./providers/discord";
import Facebook from "./providers/facebook";
import Github from "./providers/github";
import Gitlab from "./providers/gitlab";
import Google from "./providers/google";
import GoogleWorkspaces from "./providers/googleWorkspaces";
import LinkedIn from "./providers/linkedIn";
import Okta from "./providers/okta";
import Twitter from "./providers/twitter";
import { UserInput, GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext } from "./types";
import type { UserContext } from "../../types";
import type { StateObject, RecipeFunctionOptions } from "supertokens-web-js/recipe/thirdparty";
import type { User } from "supertokens-web-js/types";
export default class Wrapper {
    static init(config?: UserInput): import("../../types").RecipeInitResult<
        never,
        import("./types").PreAndPostAPIHookAction,
        {
            action: "SUCCESS";
            isNewRecipeUser: boolean;
            createdNewSession: boolean;
            user: User;
            userContext: UserContext;
        },
        import("./types").NormalisedConfig
    >;
    static signOut(input?: { userContext?: UserContext }): Promise<void>;
    static redirectToThirdPartyLogin(input: {
        thirdPartyId: string;
        shouldTryLinkingWithSessionUser?: boolean;
        userContext?: UserContext;
    }): Promise<{
        status: "OK" | "ERROR";
    }>;
    static getStateAndOtherInfoFromStorage<CustomStateProperties>(input?: {
        userContext?: UserContext;
    }): (StateObject & CustomStateProperties) | undefined;
    static getAuthorisationURLWithQueryParamsAndSetState(input: {
        thirdPartyId: string;
        frontendRedirectURI: string;
        redirectURIOnProviderDashboard?: string;
        shouldTryLinkingWithSessionUser?: boolean;
        userContext?: UserContext;
        options?: RecipeFunctionOptions;
    }): Promise<string>;
    static signInAndUp(input?: { userContext?: UserContext; options?: RecipeFunctionOptions }): Promise<
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
    static Apple: typeof Apple;
    static Bitbucket: typeof Bitbucket;
    static Discord: typeof Discord;
    static Github: typeof Github;
    static Gitlab: typeof Gitlab;
    static Google: typeof Google;
    static GoogleWorkspaces: typeof GoogleWorkspaces;
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
declare const redirectToThirdPartyLogin: typeof Wrapper.redirectToThirdPartyLogin;
declare const getStateAndOtherInfoFromStorage: typeof Wrapper.getStateAndOtherInfoFromStorage;
declare const getAuthorisationURLWithQueryParamsAndSetState: typeof Wrapper.getAuthorisationURLWithQueryParamsAndSetState;
declare const signInAndUp: typeof Wrapper.signInAndUp;
declare const ThirdpartyComponentsOverrideProvider: import("react").FC<
    import("react").PropsWithChildren<{
        components: import("./types").ComponentOverrideMap;
    }>
>;
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
    getStateAndOtherInfoFromStorage,
    getAuthorisationURLWithQueryParamsAndSetState,
    signInAndUp,
    redirectToThirdPartyLogin,
    ThirdpartyComponentsOverrideProvider,
    signOut,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
};
