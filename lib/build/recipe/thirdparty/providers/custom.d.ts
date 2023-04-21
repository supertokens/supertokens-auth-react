import type { CustomProviderConfig } from "./types";
import Provider from ".";
export default class Custom extends Provider {
    buttonComponent?: CustomProviderConfig["buttonComponent"];
    constructor(config: CustomProviderConfig);
    getLogo: () => undefined;
    static init(config: CustomProviderConfig): Provider;
}
