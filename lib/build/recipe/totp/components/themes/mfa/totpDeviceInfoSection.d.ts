/// <reference types="react" />
import type { TOTPMFACommonProps } from "../../../types";
import type { DeviceInfo } from "supertokens-web-js/recipe/totp";
export declare const DeviceInfoSection: import("react").ComponentType<
    TOTPMFACommonProps & {
        deviceInfo: DeviceInfo;
        showSecret: boolean;
        onShowSecretClicked: () => void;
    }
>;
