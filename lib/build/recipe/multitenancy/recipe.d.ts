import MultitenancyWebJS from "supertokens-web-js/recipe/multitenancy";
import { BaseRecipeModule } from "../recipeModule/baseRecipeModule";
import type { NormalisedConfig, UserInput, GetLoginMethodsResponseNormalized } from "./types";
import type { RecipeInitResult, NormalisedConfigWithAppInfoAndRecipeID, WebJSRecipeInterface } from "../../types";
export default class Multitenancy extends BaseRecipeModule<any, any, any, any> {
    readonly webJSRecipe: WebJSRecipeInterface<typeof MultitenancyWebJS>;
    static instance?: Multitenancy;
    static readonly RECIPE_ID = "multitenancy";
    private dynamicLoginMethods?;
    private hasIntersection?;
    readonly recipeID = "multitenancy";
    constructor(
        config: NormalisedConfigWithAppInfoAndRecipeID<NormalisedConfig>,
        webJSRecipe?: WebJSRecipeInterface<typeof MultitenancyWebJS>
    );
    initMultitenancyWithDynamicLoginMethods(): Promise<void>;
    getLoadedDynamicLoginMethods(): GetLoginMethodsResponseNormalized | undefined;
    static getDynamicLoginMethods(
        ...options: Parameters<typeof MultitenancyWebJS.getLoginMethods>
    ): Promise<GetLoginMethodsResponseNormalized>;
    static init(config?: UserInput): RecipeInitResult<any, any, any, any>;
    static getInstanceOrThrow(): Multitenancy;
    static reset(): void;
}
