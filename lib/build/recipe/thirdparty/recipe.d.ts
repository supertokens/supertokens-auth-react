/// <reference types="react" />
import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { CreateRecipeFunction, RecipeFeatureComponentMap } from "../../types";
import {
    GetRedirectionURLContext,
    Config,
    NormalisedConfig,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    UserInput,
} from "./types";
import EmailVerification from "../emailverification/recipe";
import { RecipeInterface as WebJSRecipeInterface } from "supertokens-web-js/recipe/thirdparty";
export default class ThirdParty extends AuthRecipeWithEmailVerification<
    GetRedirectionURLContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdParty;
    static RECIPE_ID: string;
    recipeImpl: WebJSRecipeInterface;
    constructor(
        config: Config,
        recipes: {
            emailVerificationInstance: EmailVerification | undefined;
        }
    );
    getFeatures: () => RecipeFeatureComponentMap;
    getFeatureComponent: (
        componentName: "signinup" | "signinupcallback" | "emailverification",
        props: any
    ) => JSX.Element;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): ThirdParty;
    static reset(): void;
}
