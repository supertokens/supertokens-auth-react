/// <reference types="react" />
import type { NormalisedConfig } from "../../../types";
export declare const ContinueWithPasswordlessFooter: React.FC<{
    onError: (err: string) => void;
    isPhoneNumber: boolean;
    onContinueWithPasswordlessClick: (contactInfo: string) => Promise<void>;
    config: NormalisedConfig;
}>;
