/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { CreateRecipeFunction } from "../../types";
import { Config, UserInput } from "./types";
import RecipeImplementation from "./recipeImplementation";
export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    static instance?: Session;
    static RECIPE_ID: string;
    recipeImpl: RecipeImplementation;
    constructor(config: Config);
    getFeatureComponent: (_: string) => JSX.Element;
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getUserId: () => Promise<string>;
    getJWTPayloadSecurely: () => Promise<any>;
    doesSessionExist: () => Promise<boolean>;
    signOut: () => Promise<void>;
    static init(config?: UserInput): CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getInstanceOrThrow(): Session;
    attemptRefreshingSession: () => Promise<boolean>;
    static addAxiosInterceptors(axiosInstance: any): void;
    static reset(): void;
}
