/// <reference types="react" />
import RecipeModule from "../recipeModule";
import {
    Config,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
    PreAndPostAPIHookAction,
} from "./types";
import { CreateRecipeFunction } from "../../types";
import WebJSEmailVerification from "supertokens-web-js/lib/build/recipe/emailverification/recipe";
export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailVerification;
    static RECIPE_ID: string;
    recipeImpl: RecipeInterface;
    webJsRecipe: WebJSEmailVerification;
    constructor(config: Config);
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailVerification;
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getFeatureComponent: (_: "emailverification", props: any) => JSX.Element;
    isEmailVerified(userContext: any): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
}
