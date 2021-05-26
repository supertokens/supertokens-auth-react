/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { CreateRecipeFunction } from "../../types";
import { Config, UserInput } from "./types";
export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    static instance?: Session;
    static RECIPE_ID: string;
    constructor(config: Config);
    getFeatureComponent: (_: string) => JSX.Element;
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getRefreshURLDomain: () => string | undefined;
    getUserId: () => Promise<string>;
    getJWTPayloadSecurely: () => Promise<any>;
    attemptRefreshingSession: () => Promise<boolean>;
    doesSessionExist: () => Promise<boolean>;
    signOut: () => Promise<void>;
    static init(config?: UserInput): CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getInstanceOrThrow(): Session;
    static addAxiosInterceptors(axiosInstance: any): void;
    static reset(): void;
}
