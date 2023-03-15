/// <reference types="react" />
import { EmailVerificationClaimClass } from "supertokens-web-js/recipe/emailverification";
import EmailVerificationWebJS from "supertokens-web-js/recipe/emailverification";
import RecipeModule from "../recipeModule";
import type {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
} from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type {
    NormalisedConfigWithAppInfoAndRecipeID,
    RecipeFeatureComponentMap,
    RecipeInitResult,
    WebJSRecipeInterface,
} from "../../types";
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
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
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
