/// <reference types="react" />
import type { CustomProviderConfig } from "./types";
import Provider from ".";
export default class Custom extends Provider {
    private logo;
    constructor(config: CustomProviderConfig);
    getLogo: () => JSX.Element | undefined;
    static init(config: CustomProviderConfig): Provider;
}
