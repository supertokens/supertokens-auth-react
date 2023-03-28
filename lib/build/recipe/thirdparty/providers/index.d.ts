/// <reference types="react" />
import type { ProviderConfig } from "./types";
export default abstract class Provider {
    id: string;
    name: string;
    getFrontendRedirectURI: () => string;
    clientId?: string;
    constructor(config: ProviderConfig);
    getDefaultButton(name?: string): JSX.Element;
    defaultGetFrontendRedirectURI(): string;
    getRedirectURIOnProviderDashboard(): string | undefined;
    setId(id: string): void;
    setName(name: string): void;
    abstract getButton(): JSX.Element;
    abstract getLogo(): JSX.Element | undefined;
    generateState: () => string;
}
