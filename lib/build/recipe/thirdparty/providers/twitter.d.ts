/// <reference types="react" />
import type { BuiltInProviderConfig } from "./types";
import Provider from ".";
export declare type TwitterProviderConfig = BuiltInProviderConfig & {
    useLegacyTwitterLogo?: boolean;
};
export default class Twitter extends Provider {
    private useLegacyTwitterLogo;
    private static instance?;
    constructor(config?: TwitterProviderConfig);
    getLogo: () => JSX.Element;
    static init(config?: TwitterProviderConfig): Provider;
    static reset(): void;
}
