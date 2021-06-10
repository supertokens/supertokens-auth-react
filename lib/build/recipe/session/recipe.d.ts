/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import { InputType } from "./types";
export default class Session extends RecipeModule<unknown, unknown, unknown, any> {
    static instance?: Session;
    static RECIPE_ID: string;
    constructor(
        config: InputType & {
            recipeId: string;
            appInfo: NormalisedAppInfo;
        }
    );
    getFeatureComponent: (_: string) => JSX.Element;
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getUserId: () => Promise<string>;
    getJWTPayloadSecurely: () => Promise<any>;
    doesSessionExist: () => Promise<boolean>;
    signOut: () => Promise<void>;
    attemptRefreshingSession: () => Promise<boolean>;
    static addAxiosInterceptors(axiosInstance: any): void;
    static init(config?: InputType): CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getInstanceOrThrow(): Session;
    static reset(): void;
}
