import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, RouteToFeatureComponentMap } from "../../types";
import { SessionUserInput, SessionConfig } from "./types";
export default class Session extends RecipeModule {
    static instance?: Session;
    static RECIPE_ID: string;
    private sessionSdk;
    constructor(config: SessionConfig);
    getFeatures: () => RouteToFeatureComponentMap;
    getRefreshURLDomain: () => string;
    getUserId: () => string;
    getJWTPayloadSecurely: () => Promise<any>;
    attemptRefreshingSession: () => Promise<boolean>;
    doesSessionExist: () => boolean;
    addAxiosInterceptors: () => boolean;
    setAuth0API: () => boolean;
    getAuth0API: () => boolean;
    static init(config?: SessionUserInput): CreateRecipeFunction;
    static getInstanceOrThrow(): Session;
    static getRefreshURLDomain(): string;
    static getUserId(): string;
    static getJWTPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): boolean;
    static addAxiosInterceptors(): boolean;
    static setAuth0API(): boolean;
    static getAuth0API(): boolean;
    static reset(): void;
}
