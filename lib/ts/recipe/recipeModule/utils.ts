import { isIE } from "../../utils";

import type { Config, NormalisedConfig } from "./types";

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

    const rootStyle = config.style === undefined ? "" : config.style;

    return {
        ...config,
        getRedirectionURL,
        onHandleEvent,
        preAPIHook,
        postAPIHook,
        useShadowDom,
        rootStyle,
        recipeId: config.recipeId,
        appInfo: config.appInfo,
    };
}

function getShouldUseShadowDomBasedOnBrowser(useShadowDom?: boolean): boolean {
    /*
     * Detect if browser is IE
     * In order to disable unsupported shadowDom
     * https://github.com/supertokens/supertokens-auth-react/issues/99
     */
    // If browser is Internet Explorer, always disable shadow dom.
    if (isIE() === true) {
        return false;
    }

    // Otherwise, use provided config or default to true.
    return useShadowDom !== undefined ? useShadowDom : true;
}
