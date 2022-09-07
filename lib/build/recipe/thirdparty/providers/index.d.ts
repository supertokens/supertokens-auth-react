/// <reference types="react" />
import { ProviderConfig } from "./types";
export default abstract class Provider {
    id: string;
    name: string;
    getRedirectURL: () => string;
    clientId?: string;
    constructor(config: ProviderConfig);
    getDefaultButton(name?: string): JSX.Element;
    defaultGetRedirectURL(): string;
    abstract getButton(): JSX.Element;
    abstract getLogo(): JSX.Element | undefined;
    generateState: () => string;
}
