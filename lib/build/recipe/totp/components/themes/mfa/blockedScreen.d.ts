/// <reference types="react" />
export declare const BlockedScreen: import("react").ComponentType<
    {
        nextRetryAt: number;
        onRetry: () => void;
        onSignOutClicked: () => void;
    } & {
        children?: import("react").ReactNode;
    }
>;
