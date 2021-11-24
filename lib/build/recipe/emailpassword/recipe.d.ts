/// <reference types="react" />
import AuthRecipeWithEmailVerification from "../authRecipeWithEmailVerification";
import { CreateRecipeFunction } from "../../types";
import {
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAPIHookContext,
    Config,
    NormalisedConfig,
    UserInput,
    RecipeInterface,
} from "./types";
import EmailVerification from "../emailverification/recipe";
export default class EmailPassword extends AuthRecipeWithEmailVerification<
    GetRedirectionURLContext,
    PreAPIHookContext,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailPassword;
    static RECIPE_ID: string;
    recipeImpl: RecipeInterface;
    constructor(
        config: Config,
        recipes: {
            emailVerificationInstance: EmailVerification | undefined;
        }
    );
    getFeatures: () => Record<string, import("../../types").ComponentWithRecipeAndMatchingMethod>;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getFeatureComponent: (componentName: "emailverification" | "signinup" | "resetpassword", props: any) => JSX.Element;
    static init(
        config?: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAPIHookContext, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailPassword;
    static reset(): void;
}
