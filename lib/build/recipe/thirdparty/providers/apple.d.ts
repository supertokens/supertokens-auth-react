/// <reference types="react" />
import type { BuiltInProviderConfig, CustomProviderConfig } from "./types";
import Provider from ".";
export default class Apple extends Provider {
    private static instance?;
    buttonComponent?: CustomProviderConfig["buttonComponent"];
    constructor(config?: BuiltInProviderConfig);
    getButton: () => JSX.Element;
    getLogo: () => JSX.Element;
    defaultGetRedirectURIOnProviderDashboard(): string | undefined;
    static init(config?: BuiltInProviderConfig): Provider;
    static reset(): void;
}
