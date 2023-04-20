/// <reference types="react" />
import type { BuiltInProviderConfig, ProviderConfig } from "./types";
export default abstract class Provider {
    id: string;
    name: string;
    getRedirectURL: () => string;
    clientId?: string;
    buttonComponent?: BuiltInProviderConfig["buttonComponent"];
    constructor(config: ProviderConfig);
    getDefaultButton(name?: string): JSX.Element;
    defaultGetRedirectURL(): string;
    getRedirectURIOnProviderDashboard(): string | undefined;
    abstract getButton(): JSX.Element;
    abstract getLogo(): JSX.Element | undefined;
    generateState: () => string;
}
