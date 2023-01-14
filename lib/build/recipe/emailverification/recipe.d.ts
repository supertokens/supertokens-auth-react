/// <reference types="react" />
import RecipeModule from "../recipeModule";
import {
    NormalisedConfigWithAppInfoAndRecipeID,
    RecipeFeatureComponentMap,
    RecipeInitResult,
    WebJSRecipeInterface,
} from "../../types";
import {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import { EmailVerificationClaimClass } from "supertokens-web-js/recipe/emailverification";
import EmailVerificationWebJS from "supertokens-web-js/recipe/emailverification";
import { PreAndPostAPIHookAction as PreAndPostAPIHookActionWebJS } from "supertokens-web-js/recipe/emailverification/types";
export default class EmailVerification extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof EmailVerificationWebJS>;
    static instance?: EmailVerification;
    static RECIPE_ID: string;
    static EmailVerificationClaim: EmailVerificationClaimClass;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof EmailVerificationWebJS>
    );
    static init(
        config: UserInput
    ): RecipeInitResult<
        GetRedirectionURLContext,
        PreAndPostAPIHookAction,
        OnHandleEventContext,
        NormalisedConfig,
        PreAndPostAPIHookActionWebJS
    >;
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
