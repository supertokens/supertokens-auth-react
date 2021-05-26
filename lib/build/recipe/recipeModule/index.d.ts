/// <reference types="react" />
import HttpRequest from "../../httpRequest";
import { RecipeFeatureComponentMap } from "../../types";
import { NormalisedConfig } from "./types";
export default abstract class RecipeModule<T, S, R, N extends NormalisedConfig<T, S, R>> {
    httpRequest: HttpRequest;
    config: N;
    constructor(config: N);
    redirect: (context: T, history?: any, queryParams?: Record<string, string> | undefined) => Promise<void>;
    getRedirectUrl: (context: T) => Promise<string>;
    getDefaultRedirectionURL(_: T): Promise<string>;
    abstract getFeatures(): RecipeFeatureComponentMap;
    abstract getFeatureComponent(componentName: string): JSX.Element;
}
