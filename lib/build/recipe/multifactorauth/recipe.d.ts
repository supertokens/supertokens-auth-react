import MultiFactorAuthWebJS from "supertokens-web-js/recipe/multifactorauth";
import RecipeModule from "../recipeModule";
import { MultiFactorAuthClaimClass } from "./multiFactorAuthClaim";
import type {
    UserInput,
    NormalisedConfig,
    GetRedirectionURLContext,
    OnHandleEventContext,
    PreAndPostAPIHookAction,
    SecondaryFactorRedirectionInfo,
} from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID, RecipeInitResult, WebJSRecipeInterface } from "../../types";
export default class MultiFactorAuth extends RecipeModule<
    GetRedirectionURLContext,
    PreAndPostAPIHookAction,
    OnHandleEventContext,
    NormalisedConfig
> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof MultiFactorAuthWebJS>;
    static instance?: MultiFactorAuth;
    static RECIPE_ID: string;
    static MultiFactorAuthClaim: MultiFactorAuthClaimClass;
    recipeID: string;
    private readonly firstFactors;
    private readonly secondaryFactors;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof MultiFactorAuthWebJS>
    );
    static init(
        config?: UserInput
    ): RecipeInitResult<GetRedirectionURLContext, PreAndPostAPIHookAction, OnHandleEventContext, NormalisedConfig>;
    static getInstance(): MultiFactorAuth | undefined;
    static getInstanceOrThrow(): MultiFactorAuth;
    getDefaultRedirectionURL: (context: GetRedirectionURLContext) => Promise<string>;
    getDefaultFirstFactors(): string[];
    addMFAFactors(firstFactors: string[], secondaryFactors: SecondaryFactorRedirectionInfo[]): void;
    getFirstFactors(): string[];
    getSecondaryFactors(): SecondaryFactorRedirectionInfo[];
    redirectToFactor(factorId: string, history?: any): Promise<void>;
    redirectToFactorChooser(history?: any): Promise<void>;
}
