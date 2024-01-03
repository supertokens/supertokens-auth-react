/// <reference types="react" />
import type { TOTPMFACommonProps } from "../../../types";
export declare const DeviceSetupFooter: import("react").ComponentType<
    TOTPMFACommonProps & {
        showFactorChooserButton: boolean;
        onFactorChooserButtonClicked: () => void;
        onSignOutClicked: () => void;
    }
>;
