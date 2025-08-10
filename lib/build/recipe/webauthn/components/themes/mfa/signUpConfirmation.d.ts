import * as React from "react";
export declare type MFASignUpConfirmationProps = {
    onSignUp: (email: string) => Promise<void>;
    onBackButtonClicked: () => void;
    email: string;
    error?: string;
};
export declare const WebauthnMFASignUpConfirmation: React.ComponentType<MFASignUpConfirmationProps>;
