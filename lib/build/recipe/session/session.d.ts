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
    addAxiosInterceptors: (axiosInstance: any) => void;
    setAuth0API: (apiPath: string) => void;
    getAuth0API: () => {
        apiPath: string;
    };
    static init(config?: SessionUserInput): CreateRecipeFunction;
    static getInstanceOrThrow(): Session;
    static getRefreshURLDomain(): string;
    static getUserId(): string;
    static getJWTPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): boolean;
    static addAxiosInterceptors(axiosInstance: any): void;
    static setAuth0API(apiPath: string): void;
    static getAuth0API(): {
        apiPath: string;
    };
    static reset(): void;
}
