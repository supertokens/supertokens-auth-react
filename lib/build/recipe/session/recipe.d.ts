import SessionWebJS from "supertokens-web-js/recipe/session";
import WebJSSessionRecipe from "supertokens-web-js/recipe/session";
import RecipeModule from "../recipeModule";
import type { NormalisedSessionConfig } from "./types";
import type { RecipeEventWithSessionContext, InputType } from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, RecipeInitResult } from "../../types";
import type { ClaimValidationError, SessionClaimValidator } from "supertokens-web-js/recipe/session";
import type { SessionClaim } from "supertokens-web-js/recipe/session";
export default class Session extends RecipeModule<unknown, unknown, unknown, NormalisedSessionConfig> {
    readonly webJSRecipe: Omit<typeof WebJSSessionRecipe, "init" | "default">;
    static instance?: Session;
    static RECIPE_ID: string;
    recipeID: string;
    private eventListeners;
    private redirectionHandlersFromAuthRecipes;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedSessionConfig>,
        webJSRecipe?: Omit<typeof WebJSSessionRecipe, "init" | "default">
    );
    getUserId: (input: { userContext: any }) => Promise<string>;
    getAccessToken: (input: { userContext: any }) => Promise<string | undefined>;
    getClaimValue: <T extends unknown>(input: {
        claim: SessionWebJS.SessionClaim<T>;
        userContext: any;
    }) => Promise<T | undefined>;
    getAccessTokenPayloadSecurely: (input: { userContext: any }) => Promise<any>;
    doesSessionExist: (input: { userContext: any }) => Promise<boolean>;
    signOut: (input: { userContext: any }) => Promise<void>;
    attemptRefreshingSession: () => Promise<boolean>;
    validateClaims: (input: {
        overrideGlobalClaimValidators?:
            | ((globalClaimValidators: SessionClaimValidator[], userContext: any) => SessionClaimValidator[])
            | undefined;
        userContext: any;
    }) => Promise<ClaimValidationError[]> | ClaimValidationError[];
    getInvalidClaimsFromResponse: (input: {
        response:
            | {
                  data: any;
              }
            | Response;
        userContext: any;
    }) => Promise<ClaimValidationError[]>;
    /**
     * @returns Function to remove event listener
     */
    addEventListener: (listener: (ctx: RecipeEventWithSessionContext) => void) => () => void;
    addAuthRecipeRedirectionHandler: (rid: string, redirect: (ctx: any, history: any) => Promise<void>) => void;
    validateGlobalClaimsAndHandleSuccessRedirection: (
        redirectInfo?: {
            rid: string;
            successRedirectContext: any;
        },
        userContext?: any,
        history?: any
    ) => Promise<void>;
    /**
     * This should only get called if validateGlobalClaimsAndHandleSuccessRedirection couldn't get a redirectInfo
     * @returns "/"
     */
    getDefaultRedirectionURL: () => Promise<string>;
    private notifyListeners;
    private getSessionContext;
    static addAxiosInterceptors(axiosInstance: any, userContext: any): void;
    static init(config?: InputType): RecipeInitResult<unknown, unknown, unknown, any>;
    static getInstanceOrThrow(): Session;
    static getInstance(): Session | undefined;
    static reset(): void;
}
