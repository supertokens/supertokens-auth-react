import type { NormalisedConfig } from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID } from "../../types";
export declare abstract class BaseRecipeModule<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType,
    N extends NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType>
> {
    config: NormalisedConfigWithAppInfoAndRecipeID<N>;
    abstract recipeID: string;
    constructor(config: NormalisedConfigWithAppInfoAndRecipeID<N>);
}
