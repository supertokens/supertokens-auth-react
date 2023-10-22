import React from "react";
import type { TOTPMFACommonProps } from "../../../types";
import type { DeviceInfo } from "supertokens-web-js/recipe/totp";
export declare const DeviceInfoSection: React.ComponentType<
    TOTPMFACommonProps & {
        deviceInfo: DeviceInfo;
    }
>;
