import MultitenancyWebJS from "supertokens-web-js/recipe/multitenancy";
import RecipeModule from "../recipeModule";
import type { NormalisedConfig, UserInput, GetLoginMethodsResponseNormalized } from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
export default class Multitenancy extends RecipeModule<any, any, any, any> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof MultitenancyWebJS>;
    static instance?: Multitenancy;
    static RECIPE_ID: string;
    static tenantID?: string;
    static dynamicLoginMethods?: GetLoginMethodsResponseNormalized;
    recipeID: string;
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof MultitenancyWebJS>
    );
    static getDynamicLoginMethods(
        ...options: Parameters<typeof MultitenancyWebJS.getLoginMethods>
    ): Promise<GetLoginMethodsResponseNormalized>;
    static init(config: UserInput): RecipeInitResult<any, any, any, any>;
    static getInstanceOrThrow(): Multitenancy;
    static reset(): void;
}
