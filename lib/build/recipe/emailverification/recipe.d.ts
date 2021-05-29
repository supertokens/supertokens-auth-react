/// <reference types="react" />
import RecipeModule from "../recipeModule";
import {
    Config,
    NormalisedConfig,
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
} from "./types";
import { CreateRecipeFunction } from "../../types";
export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailVerification;
    static RECIPE_ID: string;
    recipeImpl: RecipeInterface;
    constructor(config: Config);
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailVerification;
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getFeatureComponent: (_: "emailverification", props: any) => JSX.Element;
    isEmailVerified(): Promise<boolean>;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
}
