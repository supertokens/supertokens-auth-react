/// <reference types="react" />
import type { SecondaryFactorRedirectionInfo } from "../../../types";
import type { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";
export declare const FactorList: import("react").ComponentType<{
    availableFactors: SecondaryFactorRedirectionInfo[];
    mfaInfo: MFAFactorInfo;
    navigateToFactor: (factorId: string) => void;
}>;
