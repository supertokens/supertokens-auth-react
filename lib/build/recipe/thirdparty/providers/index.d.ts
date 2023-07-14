/// <reference types="react" />
import type { ProviderConfig } from "./types";
export default abstract class Provider {
    readonly config: ProviderConfig;
    get id(): string;
    get name(): string;
    constructor(config: ProviderConfig);
    getRedirectURL(): string;
    getRedirectURIOnProviderDashboard(): string | undefined;
    getButton: (name?: string) => JSX.Element;
    abstract getLogo(): JSX.Element | undefined;
}
