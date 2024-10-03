/// <reference types="react" />
export declare const AuthPageHeader: import("react").ComponentType<{
    factorIds: string[];
    isSignUp: boolean;
    hasSeparateSignUpView: boolean;
    onSignInUpSwitcherClick: (() => void) | undefined;
    resetFactorList: () => void;
    showBackButton: boolean;
    oauth2ClientInfo?:
        | {
              logoUri?: string | undefined;
              clientUri?: string | undefined;
              clientName: string;
          }
        | undefined;
}>;
