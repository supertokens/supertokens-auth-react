/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, NormalisedAppInfo, RecipeFeatureComponentMap } from "../../types";
import { RecipeEventWithSessionContext, InputType, SessionClaimValidator, ClaimValidationError } from "./types";
import { Recipe as WebJSSessionRecipe } from "supertokens-web-js/recipe/session/recipe";
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
    private readonly defaultClaimValidators;
    constructor(config: ConfigType);
    getFeatureComponent: (_: string) => JSX.Element;
    getFeatures: () => RecipeFeatureComponentMap;
    getUserId: (input: { userContext: any }) => Promise<string>;
    getAccessTokenPayloadSecurely: (input: { userContext: any }) => Promise<any>;
    doesSessionExist: (input: { userContext: any }) => Promise<boolean>;
    signOut: (input: { userContext: any }) => Promise<void>;
    attemptRefreshingSession: () => Promise<boolean>;
    redirectToAuthWithRedirectToPath(history?: any, queryParams?: Record<string, string>): Promise<void>;
    redirectToAuthWithoutRedirectToPath(history?: any, queryParams?: Record<string, string>): Promise<void>;
    validateClaims: (
        claimValidators: SessionClaimValidator<any>[],
        userContext?: any
    ) => Promise<ClaimValidationError | undefined>;
    addDefaultClaimValidator: (claimValidator: SessionClaimValidator<any>) => void;
    getDefaultClaimValidators: () => SessionClaimValidator<any>[];
    /**
     * @returns Function to remove event listener
     */
    addEventListener: (listener: (ctx: RecipeEventWithSessionContext) => void) => () => void;
    private notifyListeners;
    private getSessionContext;
    static addAxiosInterceptors(axiosInstance: any, userContext: any): void;
    static init(config?: InputType): CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getInstanceOrThrow(): Session;
    static reset(): void;
}
export {};
