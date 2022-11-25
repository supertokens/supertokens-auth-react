/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, NormalisedAppInfo, RecipeFeatureComponentMap } from "../../types";
import { RecipeEventWithSessionContext, InputType } from "./types";
import { Recipe as WebJSSessionRecipe } from "supertokens-web-js/recipe/session/recipe";
import { ClaimValidationError, SessionClaimValidator } from "supertokens-website";
import { SessionClaim } from "supertokens-web-js/recipe/session";
declare type ConfigType = InputType & {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    enableDebugLogs: boolean;
};
export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    static instance?: Session;
    static RECIPE_ID: string;
    webJsRecipe: WebJSSessionRecipe;
    private eventListeners;
    private redirectionHandlersFromAuthRecipes;
    constructor(config: ConfigType);
    getFeatureComponent: (_: string) => JSX.Element;
    getFeatures: () => RecipeFeatureComponentMap;
    getUserId: (input: { userContext: any }) => Promise<string>;
    getClaimValue: (input: { claim: SessionClaim<unknown>; userContext: any }) => Promise<unknown>;
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
    static init(config?: InputType): CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getInstanceOrThrow(): Session;
    static getInstance(): Session | undefined;
    static reset(): void;
}
export {};
