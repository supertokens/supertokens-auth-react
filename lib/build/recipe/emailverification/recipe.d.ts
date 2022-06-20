/// <reference types="react" />
import RecipeModule from "../recipeModule";
import { RecipeFeatureComponentMap } from "../../types";
import {
    Config,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    UserInput,
    PreAndPostAPIHookAction,
} from "./types";
import { CreateRecipeFunction } from "../../types";
import { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailVerification;
    static RECIPE_ID: string;
    recipeImpl: RecipeInterface;
    constructor(config: Config);
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailVerification;
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (_: "emailverification", props: any) => JSX.Element;
    isEmailVerified(userContext: any): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
}
