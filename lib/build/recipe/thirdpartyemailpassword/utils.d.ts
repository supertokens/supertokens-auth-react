import { NormalisedThirdPartyEmailPasswordConfig, ThirdPartyEmailPasswordConfig } from "./types";
import { ThirdPartyConfig } from "../thirdparty/types";
import { EmailPasswordConfig } from "../emailpassword/types";
export declare function normaliseThirdPartyEmailPasswordConfig(config: ThirdPartyEmailPasswordConfig): NormalisedThirdPartyEmailPasswordConfig;
export declare function isEmailPasswordConfig(config: ThirdPartyEmailPasswordConfig): EmailPasswordConfig;
export declare function isThirdPartyConfig(config: ThirdPartyEmailPasswordConfig): ThirdPartyConfig;
