import { Config, NormalisedConfig } from "./types";

export function normaliseRecipeModuleConfig<T, S, R>(config: Config<T, S, R>): NormalisedConfig<T, S, R> {
    let { onHandleEvent, getRedirectionURL, preAPIHook, postAPIHook } = config;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = (_: unknown): void => {};
    }

    if (getRedirectionURL === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getRedirectionURL = async (_: unknown): Promise<string | undefined> => undefined;
    }

    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = async (context: any) => context;
    }

    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = async () => {};
    }

    let useShadowDom = config.useShadowDom === undefined ? true : config.useShadowDom;
    useShadowDom = getShouldUseShadowDomBasedOnBrowser(useShadowDom);

    const palette = config.palette === undefined ? {} : config.palette;
    const rootStyle = config.style === undefined ? {} : config.style;

    return {
        ...config,
        getRedirectionURL,
        onHandleEvent,
        preAPIHook,
        postAPIHook,
        useShadowDom,
        palette,
        rootStyle,
    };
}

function getShouldUseShadowDomBasedOnBrowser(useShadowDom?: boolean): boolean {
    return useShadowDom !== undefined ? useShadowDom : true;
}
