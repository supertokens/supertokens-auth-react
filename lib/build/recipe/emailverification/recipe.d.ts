/// <reference types="react" />
import { EmailVerificationClaimClass } from "supertokens-web-js/recipe/emailverification";
import RecipeModule from "../recipeModule";
import type {
    UserInput,
    Config,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { RecipeFeatureComponentMap } from "../../types";
import type { CreateRecipeFunction } from "../../types";
import type { RecipeInterface } from "supertokens-web-js/recipe/emailverification";
export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    static instance?: EmailVerification;
    static RECIPE_ID: string;
    static EmailVerificationClaim: EmailVerificationClaimClass;
    recipeImpl: RecipeInterface;
    constructor(config: Config);
    static init(
        config: UserInput
    ): CreateRecipeFunction<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstanceOrThrow(): EmailVerification;
    getFeatures: (useComponentOverrides?: () => GenericComponentOverrideMap<any>) => RecipeFeatureComponentMap;
    getFeatureComponent: (
        _: "emailverification",
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ) => JSX.Element;
    isEmailVerified(userContext: any): Promise<{
        status: "OK";
        isVerified: boolean;
        fetchResponse: Response;
    }>;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
}
