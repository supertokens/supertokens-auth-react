import RecipeModule from "../recipeModule";
import { CreateRecipeFunction } from "../../types";
import { SessionUserInput, SessionConfig } from "./types";
export default class Session extends RecipeModule {
    static instance?: Session;
    static RECIPE_ID: string;
    private sessionSdk;
    constructor(config: SessionConfig);
    getFeatures: () => Record<string, import("../../types").ReactComponentClass>;
    getRefreshURLDomain: () => string;
    getUserId: () => string;
    getJWTPayloadSecurely: () => Promise<any>;
    attemptRefreshingSession: () => Promise<boolean>;
    doesSessionExist: () => boolean;
    static init(config?: SessionUserInput): CreateRecipeFunction;
    static getInstanceOrThrow(): Session;
    static getRefreshURLDomain(): string;
    static getUserId(): string;
    static getJWTPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): boolean;
    static reset(): void;
}
