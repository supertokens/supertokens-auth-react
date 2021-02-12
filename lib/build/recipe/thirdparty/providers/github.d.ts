/// <reference types="react" />
import Provider from ".";
import { BuiltInProviderConfig } from "./types";
export default class Github extends Provider {
    private static instance?;
    buttonComponent?: JSX.Element;
    constructor(config?: BuiltInProviderConfig);
    getButton: () => JSX.Element;
    getLogo: () => JSX.Element;
    static init(config?: BuiltInProviderConfig): Provider;
    static reset(): void;
}
