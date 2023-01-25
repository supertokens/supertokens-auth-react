/// <reference types="react" />
import type { CustomProviderConfig } from "./types";
import Provider from ".";
export default class Custom extends Provider {
    buttonComponent?: JSX.Element | (() => JSX.Element);
    constructor(config: CustomProviderConfig);
    getButton: () => JSX.Element;
    getLogo: () => undefined;
    static init(config: CustomProviderConfig): Provider;
}
