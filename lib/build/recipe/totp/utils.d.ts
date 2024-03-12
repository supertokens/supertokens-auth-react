import type { Config, NormalisedConfig } from "./types";
export declare function normaliseMultiFactorAuthFeature(config?: Config): NormalisedConfig;
export declare function totpCodeValidate(value: any): Promise<string | undefined>;
