import type MultiFactorAuth from "./recipe";
import type { Config, NormalisedConfig } from "./types";
import type { UserContext } from "../../types";
import type { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";
export declare function normaliseMultiFactorAuthFeature(config?: Config): NormalisedConfig;
export declare function getAvailableFactors(
    factors: MFAFactorInfo,
    nextArrayQueryParam: string | undefined,
    recipe: MultiFactorAuth,
    userContext: UserContext
): import("./types").SecondaryFactorRedirectionInfo[];
