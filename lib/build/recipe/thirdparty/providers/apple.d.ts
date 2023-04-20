/// <reference types="react" />
import type { BuiltInProviderConfig } from "./types";
import Provider from ".";
export default class Apple extends Provider {
    private static instance?;
    constructor(config?: BuiltInProviderConfig);
    getLogo: () => JSX.Element;
    getRedirectURIOnProviderDashboard(): string | undefined;
    static init(config?: BuiltInProviderConfig): Provider;
    static reset(): void;
}
