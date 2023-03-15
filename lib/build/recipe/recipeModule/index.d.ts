/// <reference types="react" />
import type { NormalisedConfig } from "./types";
import type { GenericComponentOverrideMap } from "../../components/componentOverride/componentOverrideContext";
import type { NormalisedConfigWithAppInfoAndRecipeID, RecipeFeatureComponentMap } from "../../types";
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
    abstract getFeatures(useComponentOverrides?: () => GenericComponentOverrideMap<any>): RecipeFeatureComponentMap;
    abstract getFeatureComponent(
        componentName: string,
        props: any,
        useComponentOverrides?: () => GenericComponentOverrideMap<any>
    ): JSX.Element;
}
