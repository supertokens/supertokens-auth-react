import { Config, NormalisedConfig } from "./types";

export function normaliseRecipeModuleConfig<T, S, R>(
    config: Config<T, S, R>
): NormalisedConfig<T, S, R> {
    let { preAPIHook, onHandleEvent, getRedirectionURL } = config;
    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = async (context: any): Promise<RequestInit> => context.requestInit;
    }

    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = (_: unknown): void => { };
    }

    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = async (_: unknown): Promise<string | undefined> => undefined;
    }

    const useShadowDom = config.useShadowDom === undefined ? true : config.useShadowDom;
    const palette = config.palette === undefined ? {} : config.palette;

    return {
        preAPIHook,
        getRedirectionURL,
        onHandleEvent,
        useShadowDom,
        palette,
        recipeId: config.recipeId,
        appInfo: config.appInfo
    };
}