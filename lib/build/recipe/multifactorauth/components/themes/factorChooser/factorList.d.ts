/// <reference types="react" />
import type { SecondaryFactorRedirectionInfo } from "../../../types";
export declare const FactorList: import("react").ComponentType<{
    availableFactors: SecondaryFactorRedirectionInfo[];
    navigateToFactor: (factorId: string) => void;
}>;
