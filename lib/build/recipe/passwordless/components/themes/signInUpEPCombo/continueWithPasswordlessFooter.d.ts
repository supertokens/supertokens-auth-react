/// <reference types="react" />
import type { NormalisedConfig } from "../../../types";
export declare const ContinueWithPasswordlessFooter: React.FC<
    | {
          onError: (err: string) => void;
          isPhoneNumber: true;
          onContinueWithPasswordlessClick: (contactInfo: string) => Promise<void>;
          validatePhoneNumber: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
          config: NormalisedConfig;
      }
    | {
          onError: (err: string) => void;
          isPhoneNumber: false;
          onContinueWithPasswordlessClick: (contactInfo: string) => Promise<void>;
          validatePhoneNumber?: (phoneNumber: string) => Promise<string | undefined> | string | undefined;
          config: NormalisedConfig;
      }
>;
