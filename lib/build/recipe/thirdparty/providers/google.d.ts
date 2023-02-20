/// <reference types="react" />
import type { BuiltInProviderConfig } from "./types";
import Provider from ".";
export default class Google extends Provider {
    private static instance?;
    buttonComponent?: JSX.Element;
    constructor(config?: BuiltInProviderConfig);
    getButton: () => JSX.Element;
    getLogo: () => JSX.Element;
    static init(config?: BuiltInProviderConfig): Provider;
    static reset(): void;
}
