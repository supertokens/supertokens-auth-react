import type { CustomProviderConfig } from "./types";
import Provider from ".";
export default class Custom extends Provider {
    constructor(config: CustomProviderConfig);
    getLogo: () => undefined;
    static init(config: CustomProviderConfig): Provider;
}
