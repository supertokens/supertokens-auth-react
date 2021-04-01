import RecipeModule from "../recipeModule";
import { CreateRecipeFunction } from "../../types";
import { SessionUserInput, SessionConfig } from "./types";
export default class Session extends RecipeModule<unknown, unknown, unknown> {
    static instance?: Session;
    static RECIPE_ID: string;
    constructor(config: SessionConfig);
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getRefreshURLDomain: () => string | undefined;
    getUserId: () => string;
    getJWTPayloadSecurely: () => Promise<any>;
    attemptRefreshingSession: () => Promise<boolean>;
    doesSessionExist: () => boolean;
    setAuth0API: (apiPath: string) => void;
    getAuth0API: () => {
        apiPath: string | undefined;
    };
    signOut: () => Promise<void>;
    static init(config?: SessionUserInput): CreateRecipeFunction<unknown, unknown, unknown>;
    static getInstanceOrThrow(): Session;
    static getRefreshURLDomain(): string | undefined;
    static getUserId(): string;
    static getJWTPayloadSecurely(): Promise<any>;
    static attemptRefreshingSession(): Promise<boolean>;
    static doesSessionExist(): boolean;
    static addAxiosInterceptors(axiosInstance: any): void;
    static setAuth0API(apiPath: string): void;
    static getAuth0API(): {
        apiPath: string | undefined;
    };
    static signOut(): Promise<void>;
    static reset(): void;
}
