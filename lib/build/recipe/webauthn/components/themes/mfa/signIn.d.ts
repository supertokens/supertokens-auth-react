import * as React from "react";
export declare type MFASignInProps = {
    onBackButtonClicked?: () => void;
    onSignIn: () => Promise<void>;
    onRegisterPasskeyClick: () => void;
    canRegisterPasskey: boolean;
    error: string | undefined;
    deviceSupported: boolean;
};
export declare const WebauthnMFASignIn: React.ComponentType<MFASignInProps>;
