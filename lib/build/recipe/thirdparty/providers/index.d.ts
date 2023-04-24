/// <reference types="react" />
import type { BuiltInProviderConfig, ProviderConfig } from "./types";
export default abstract class Provider {
    id: string;
    name: string;
    getFrontendRedirectURI: () => string;
    clientId?: string;
    buttonComponent?: BuiltInProviderConfig["buttonComponent"];
    constructor(config: ProviderConfig);
    getDefaultButton(name?: string): JSX.Element;
    defaultGetFrontendRedirectURI(): string;
    getRedirectURIOnProviderDashboard(): string | undefined;
    setId(id: string): void;
    setName(name: string): void;
    getButton: () => JSX.Element;
    abstract getLogo(): JSX.Element | undefined;
    generateState: () => string;
}
