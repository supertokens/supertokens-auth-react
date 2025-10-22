import type { Meta, StoryObj } from "@storybook/react";
import meta, { Args } from "./authPage.stories";

type Story = StoryObj<Args>;

export default {
    ...meta,
    title: "WebAuthn/Auth",
};

// Basic WebAuthn stories for sign up/sign in flows
export const SignUpForm: Story = {
    args: {
        "multifactorauth.firstFactors": ["webauthn"],
        defaultToSignUp: true,
    },
};

export const SignInForm: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["webauthn"],
        defaultToSignUp: false,
    },
};

// Combined with other authentication methods
export const CombinedWithEmailPassword: Story = {
    args: {
        "multifactorauth.firstFactors": ["emailpassword", "webauthn"],
    },
};

export const CombinedWithPasswordless: Story = {
    args: {
        "multifactorauth.firstFactors": ["otp-email", "webauthn"],
    },
};

export const CombinedWithThirdParty: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "webauthn"],
    },
};

export const AllAuthMethods: Story = {
    args: {
        "multifactorauth.firstFactors": ["emailpassword", "thirdparty", "otp-email", "otp-phone", "webauthn"],
    },
};

// Recovery scenarios
export const SendRecoveryEmail: Story = {
    args: {
        path: "/auth/webauthn/recover/send-email",
        "multifactorauth.firstFactors": ["webauthn"],
    },
};

export const RecoveryEmailClicked: Story = {
    args: {
        path: "/auth/webauthn/recover",
        "multifactorauth.firstFactors": ["webauthn"],
    },
    // loaders: [
    //     async () => ({
    //         funcOverrides: {
    //             webauthn: (oI: any) => ({
    //                 ...oI,
    //                 generateRecoverAccountToken: async () => ({
    //                     status: "OK",
    //                     fetchResponse: undefined as any,
    //                 }),
    //             }),
    //         },
    //     }),
    // ],
};

export const RecoverAccountTokenInvalid: Story = {
    args: {
        path: "/auth/webauthn/recover",
        query: "?token=invalid-token",
        "multifactorauth.firstFactors": ["webauthn"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                webauthn: (oI: any) => ({
                    ...oI,
                    getRegisterOptions: async () => ({
                        status: "RECOVER_ACCOUNT_TOKEN_INVALID_ERROR",
                        fetchResponse: undefined as any,
                    }),
                }),
            },
        }),
    ],
};

// Error scenarios
export const WebAuthnNotSupported: Story = {
    args: {
        "multifactorauth.firstFactors": ["webauthn"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                webauthn: (oI: any) => ({
                    ...oI,
                    doesBrowserSupportWebAuthn: async () => ({
                        status: "OK",
                        browserSupportsWebauthn: false,
                        platformAuthenticatorIsAvailable: false,
                    }),
                }),
            },
        }),
    ],
};

export const InvalidCredentials: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["webauthn"],
        defaultToSignUp: false,
    },
    loaders: [
        async () => ({
            funcOverrides: {
                webauthn: (oI: any) => ({
                    ...oI,
                    authenticateCredentialWithSignIn: async () => ({
                        status: "INVALID_CREDENTIALS_ERROR",
                        fetchResponse: undefined as any,
                    }),
                }),
            },
        }),
    ],
};
