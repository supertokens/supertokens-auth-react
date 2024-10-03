import SessionWebJS from "supertokens-web-js/recipe/session";
import WebJSSessionRecipe from "supertokens-web-js/recipe/session";
import RecipeModule from "../recipeModule";
import type { NormalisedSessionConfig } from "./types";
import type { RecipeEventWithSessionContext, InputType } from "./types";
import type {
    Navigate,
    NormalisedConfigWithAppInfoAndRecipeID,
    RecipeInitResult,
    SuccessRedirectContextInApp,
    SuccessRedirectContextOAuth2,
    UserContext,
} from "../../types";
import type { ClaimValidationError, SessionClaimValidator } from "supertokens-web-js/recipe/session";
import type { SessionClaim } from "supertokens-web-js/recipe/session";
export default class Session extends RecipeModule<unknown, unknown, unknown, NormalisedSessionConfig> {
    readonly webJSRecipe: Omit<typeof WebJSSessionRecipe, "init" | "default">;
    static instance?: Session;
    static RECIPE_ID: string;
    recipeID: string;
    private eventListeners;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedSessionConfig>,
        webJSRecipe?: Omit<typeof WebJSSessionRecipe, "init" | "default">
    );
    getUserId: (input: { userContext: UserContext }) => Promise<string>;
    getAccessToken: (input: { userContext: UserContext }) => Promise<string | undefined>;
    getClaimValue: <T extends unknown>(input: {
        claim: SessionWebJS.SessionClaim<T>;
        userContext: UserContext;
    }) => Promise<T | undefined>;
    getAccessTokenPayloadSecurely: (input: { userContext: UserContext }) => Promise<any>;
    doesSessionExist: (input: { userContext: UserContext }) => Promise<boolean>;
    signOut: (input: { userContext: UserContext }) => Promise<void>;
    attemptRefreshingSession: () => Promise<boolean>;
    validateClaims: (input: {
        overrideGlobalClaimValidators?:
            | ((globalClaimValidators: SessionClaimValidator[], userContext: UserContext) => SessionClaimValidator[])
            | undefined;
        userContext: UserContext;
    }) => Promise<ClaimValidationError[]> | ClaimValidationError[];
    getInvalidClaimsFromResponse: (input: {
        response:
            | {
                  data: any;
              }
            | Response;
        userContext: UserContext;
    }) => Promise<ClaimValidationError[]>;
    /**
     * @returns Function to remove event listener
     */
    addEventListener: (listener: (ctx: RecipeEventWithSessionContext) => void) => () => void;
    validateGlobalClaimsAndHandleSuccessRedirection: (
        successRedirectContext:
            | ((Omit<SuccessRedirectContextInApp, "recipeId"> | Omit<SuccessRedirectContextOAuth2, "recipeId">) & {
                  recipeId: string;
                  tenantIdFromQueryParams: string | undefined;
              })
            | undefined,
        fallbackRecipeId: string,
        redirectToPath: string | undefined,
        userContext: UserContext | undefined,
        navigate: Navigate | undefined
    ) => Promise<void>;
    /**
     * This should only get called if validateGlobalClaimsAndHandleSuccessRedirection couldn't get a redirectInfo
     * @returns "/"
     */
    getDefaultRedirectionURL: () => Promise<string>;
    private notifyListeners;
    private getSessionContext;
    static addAxiosInterceptors(axiosInstance: any, userContext: UserContext): void;
    static init(config?: InputType): RecipeInitResult<unknown, unknown, unknown, any>;
    static getInstanceOrThrow(): Session;
    static getInstance(): Session | undefined;
    static reset(): void;
}
