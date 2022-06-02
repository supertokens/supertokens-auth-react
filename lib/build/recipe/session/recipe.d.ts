/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import { ClaimValidationError, InputType, RecipeEventWithSessionContext, SessionClaimValidator } from "./types";
declare type ConfigType = InputType & {
    recipeId: string;
    appInfo: NormalisedAppInfo;
    enableDebugLogs: boolean;
};
export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    static instance?: Session;
    static RECIPE_ID: string;
    private eventListeners;
    private readonly defaultClaimValidators;
    constructor(config: ConfigType);
    getFeatureComponent: (_: string) => JSX.Element;
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getUserId: () => Promise<string>;
    getAccessTokenPayloadSecurely: () => Promise<any>;
    doesSessionExist: () => Promise<boolean>;
    signOut: () => Promise<void>;
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
    static addAxiosInterceptors(axiosInstance: any): void;
    static init(config?: InputType): CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getInstanceOrThrow(): Session;
    static reset(): void;
}
export {};
