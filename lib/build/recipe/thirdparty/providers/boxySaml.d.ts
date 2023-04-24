/// <reference types="react" />
import type { BuiltInProviderConfig } from "./types";
import Provider from ".";
export default class BoxySAML extends Provider {
    private static instance?;
    constructor(config?: BuiltInProviderConfig);
    getLogo: () => JSX.Element;
    static init(config?: BuiltInProviderConfig): Provider;
    static reset(): void;
}
