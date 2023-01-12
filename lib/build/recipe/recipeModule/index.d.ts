/// <reference types="react" />
import { NormalisedConfigWithAppInfoAndRecipeID, RecipeFeatureComponentMap } from "../../types";
import { NormalisedConfig } from "./types";
export default abstract class RecipeModule<
    GetRedirectionURLContextType,
    Action,
    OnHandleEventContextType,
    N extends NormalisedConfig<GetRedirectionURLContextType, Action, OnHandleEventContextType>
> {
    config: NormalisedConfigWithAppInfoAndRecipeID<N>;
    constructor(config: NormalisedConfigWithAppInfoAndRecipeID<N>);
    redirect: (
        context: GetRedirectionURLContextType,
        history?: any,
        queryParams?: Record<string, string>
    ) => Promise<void>;
    getRedirectUrl: (context: GetRedirectionURLContextType) => Promise<string>;
    getDefaultRedirectionURL(_: GetRedirectionURLContextType): Promise<string>;
    abstract getFeatures(): RecipeFeatureComponentMap;
    abstract getFeatureComponent(componentName: string, props: any): JSX.Element;
}
