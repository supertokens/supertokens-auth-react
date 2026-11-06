import type { Config, NormalisedConfig } from "./types";

export function normaliseRecipeModuleConfig<T, S, R>(config?: Config<T, S, R>): NormalisedConfig<T, S, R> {
    if (config === undefined) {
        config = {};
    }
    let { onHandleEvent, preAPIHook, postAPIHook } = config;
    const userGetRedirectionURL = config.getRedirectionURL;
    if (onHandleEvent === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        onHandleEvent = (_: unknown): void => {};
    }

    // the user provided function may be sync or async, we always expose an async one internally
    const normalisedGetRedirectionURL: NormalisedConfig<T, S, R>["getRedirectionURL"] =
        userGetRedirectionURL === undefined
            ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
              async (_: unknown): Promise<string | undefined | null> => undefined
            : async (context, userContext) => userGetRedirectionURL(context, userContext);

    if (preAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        preAPIHook = async (context: any) => context;
    }

    if (postAPIHook === undefined) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        postAPIHook = async () => {};
    }

    const rootStyle = config.style === undefined ? "" : config.style;

    return {
        ...config,
        getRedirectionURL: normalisedGetRedirectionURL,
        onHandleEvent,
        preAPIHook,
        postAPIHook,
        recipeRootStyle: rootStyle,
    };
}
