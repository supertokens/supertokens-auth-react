import * as React from "react";
export declare type MFASignUpProps = {
    onContinueClick: (email: string) => void;
    clearError: () => void;
    email?: string;
    error?: string;
    onError: (error: string) => void;
    onFetchError?: (error: Response) => void;
    onRecoverAccountClick: () => void;
    onBackButtonClicked?: () => void;
    onSignOutClicked: () => void;
};
export declare const WebauthnMFASignUp: React.ComponentType<MFASignUpProps>;
