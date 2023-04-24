/// <reference types="react" />
import type { BuiltInProviderConfig } from "./types";
import Provider from ".";
export default class Okta extends Provider {
    private static instance?;
    constructor(config?: BuiltInProviderConfig);
    getLogo: () => JSX.Element;
    static init(config?: BuiltInProviderConfig): Provider;
    static reset(): void;
}
