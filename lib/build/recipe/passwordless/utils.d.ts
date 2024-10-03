import type { Config, LoginAttemptInfo, NormalisedConfig } from "./types";
export declare function normalisePasswordlessConfig(config: Config): NormalisedConfig;
export declare function checkAdditionalLoginAttemptInfoProperties(loginAttemptInfo: LoginAttemptInfo): boolean;
