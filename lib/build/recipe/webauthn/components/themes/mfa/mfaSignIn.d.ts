import * as React from "react";
export declare type MFASignInProps = {
    onBackButtonClicked?: () => void;
    onSignIn: () => Promise<void>;
    error: string | undefined;
    deviceSupported: boolean;
    canRegisterPasskey: boolean;
    onRegisterPasskeyClick: () => void;
    onSignOutClicked: () => void;
};
export declare const WebauthnMFASignIn: React.ComponentType<MFASignInProps>;
