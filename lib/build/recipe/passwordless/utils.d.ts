import { CountryCode } from "libphonenumber-js";
import { Config, NormalisedConfig } from "./types";
export declare function normalisePasswordlessConfig(config: Config): NormalisedConfig;
export declare function defaultGuessInternationPhoneNumberFromInputPhoneNumber(
    value: string,
    defaultCountryFromConfig?: CountryCode
): string;
