/// <reference types="react" />
import type { TOTPMFACommonProps } from "../../../types";
export declare const DeviceSetupFooter: import("react").ComponentType<
    TOTPMFACommonProps & {
        onFactorChooserButtonClicked: () => void;
        onSignOutClicked: () => void;
    }
>;