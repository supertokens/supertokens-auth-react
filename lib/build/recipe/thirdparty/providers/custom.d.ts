/// <reference types="react" />
import Provider from ".";
import { CustomProviderConfig } from "./types";
export default class Custom extends Provider {
    buttonComponent?: JSX.Element | (() => JSX.Element);
    constructor(config: CustomProviderConfig);
    getButton: () => JSX.Element;
    getLogo: () => undefined;
    static init(config: CustomProviderConfig): Provider;
}
