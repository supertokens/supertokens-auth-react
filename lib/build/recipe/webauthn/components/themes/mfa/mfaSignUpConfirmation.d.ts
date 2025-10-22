import * as React from "react";
export declare type MFASignUpConfirmationProps = {
    email: string;
    error?: string;
    onSignUp: () => Promise<void>;
    onBackButtonClicked?: () => void;
    onSignOutClicked: () => void;
};
export declare const WebauthnMFASignUpConfirmation: React.ComponentType<MFASignUpConfirmationProps>;
