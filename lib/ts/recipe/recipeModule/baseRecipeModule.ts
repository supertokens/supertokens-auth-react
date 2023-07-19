import type { NormalisedConfig } from "./types";
import type { NormalisedConfigWithAppInfoAndRecipeID } from "../../types";

export abstract class BaseRecipeModule<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType,
    N extends NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType>
> {
    config: NormalisedConfigWithAppInfoAndRecipeID<N>;
    public abstract recipeID: string;
    /*
     * Constructor.
     */
    constructor(config: NormalisedConfigWithAppInfoAndRecipeID<N>) {
        this.config = config;
    }
}
