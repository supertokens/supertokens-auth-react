/// <reference types="react" />
import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { CreateRecipeFunction } from "../../types";
import {
    GetRedirectionURLContext,
    Config,
    NormalisedConfig,
    PreAndPostAPIHookContext,
    OnHandleEventContext,
    UserInput,
    RecipeInterface,
} from "./types";
import EmailVerification from "../emailverification/recipe";
export default class ThirdParty extends AuthRecipeWithEmailVerification<
    GetRedirectionURLContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: ThirdParty;
    static RECIPE_ID: string;
    recipeImpl: RecipeInterface;
    constructor(
        config: Config,
        recipes: {
            emailVerificationInstance: EmailVerification | undefined;
        }
    );
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getFeatureComponent: (
        componentName: "emailverification" | "signinup" | "signinupcallback",
        props: any
    ) => JSX.Element;
    getDefaultRedirectionURL: (
        context: import("../authRecipeWithEmailVerification/types").GetRedirectionURLContext
    ) => Promise<string>;
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookContext, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): ThirdParty;
    static reset(): void;
}
