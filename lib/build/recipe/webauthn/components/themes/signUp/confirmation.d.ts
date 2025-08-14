/// <reference types="react" />
import type { SignUpFormProps } from "../../../types";
export declare const PasskeyConfirmation: import("react").ComponentType<
    SignUpFormProps & {
        email?: string | undefined;
        onContinueClick: () => void;
        errorMessageLabel?: string | undefined;
        isLoading: boolean;
        hideContinueWithoutPasskey?: boolean | undefined;
        isContinueDisabled?: boolean | undefined;
        isPasskeySupported: boolean;
    }
>;
