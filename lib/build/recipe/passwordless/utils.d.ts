import type { Config, NormalisedConfig } from "./types";
import type { DynamicLoginMethodsContextValue } from "../multitenancy/dynamicLoginMethodsContext";
export declare function normalisePasswordlessConfig(config: Config): NormalisedConfig;
export declare function getEnabledContactMethods(
    contactMethod: "PHONE" | "EMAIL" | "EMAIL_OR_PHONE",
    currentDynamicLoginMethods: DynamicLoginMethodsContextValue
): string[];
