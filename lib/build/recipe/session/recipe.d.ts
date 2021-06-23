/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { CreateRecipeFunction, NormalisedAppInfo } from "../../types";
import { InputType, OnHandleEventContext } from "./types";
declare type ConfigType = InputType & {
    recipeId: string;
    appInfo: NormalisedAppInfo;
};
export default class Session extends RecipeModule<unknown, unknown, unknown, ConfigType> {
    static instance?: Session;
    static RECIPE_ID: string;
    private eventListeners;
    constructor(config: ConfigType);
    getFeatureComponent: (_: string) => JSX.Element;
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getUserId: () => Promise<string>;
    getJWTPayloadSecurely: () => Promise<any>;
    doesSessionExist: () => Promise<boolean>;
    signOut: () => Promise<void>;
    attemptRefreshingSession: () => Promise<boolean>;
    addEventListener(listener: (ctx: OnHandleEventContext) => void): () => void;
    private onHandleEvent;
    static addAxiosInterceptors(axiosInstance: any): void;
    static init(config?: InputType): CreateRecipeFunction<unknown, unknown, unknown, any>;
    static getInstanceOrThrow(): Session;
    static reset(): void;
}
export {};
