/// <reference types="react" />
import { RecipeFeatureComponentMap } from "../../types";
import { NormalisedConfig } from "./types";
export default abstract class RecipeModule<T, S, R, N extends NormalisedConfig<T, S, R>> {
    config: N;
    constructor(config: N);
    redirect: (context: T, history?: any, queryParams?: Record<string, string> | undefined) => Promise<void>;
    getRedirectUrl: (context: T) => Promise<string>;
    getDefaultRedirectionURL(_: T): Promise<string>;
    abstract getFeatures(): RecipeFeatureComponentMap;
    abstract getFeatureComponent(componentName: string, props: any): JSX.Element;
}
