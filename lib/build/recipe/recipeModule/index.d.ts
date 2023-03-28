import type { NormalisedConfig } from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID } from "../../types";
export default abstract class RecipeModule<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType,
    N extends NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType>
> {
    config: NormalisedConfigWithAppInfoAndRecipeID<N>;
    abstract recipeID: string;
    constructor(config: NormalisedConfigWithAppInfoAndRecipeID<N>);
    redirect: (
        context: GetRedirectionURLContextType,
        history?: any,
        queryParams?: Record<string, string>
    ) => Promise<void>;
    getRedirectUrl: (context: GetRedirectionURLContextType) => Promise<string>;
    getDefaultRedirectionURL(_: GetRedirectionURLContextType): Promise<string>;
}
