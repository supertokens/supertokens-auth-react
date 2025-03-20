import type { Meta, StoryObj } from "@storybook/react";
import meta, { Args } from "./authPage.stories";
import { overridePWlessWithLoginAttempt, withFetchResponse } from "./utils";
import { within, configure } from "@storybook/testing-library";
import userEvent from "@testing-library/user-event";

type Story = StoryObj<Args>;

export default {
    ...meta,
    title: "AllRecipes/Auth",
};

export const SignIn: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
};
export const SignInWithUnknownUser: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: (oI) => ({
                    ...oI,
                    doesEmailExist: () => withFetchResponse({ status: "OK", doesExist: false }),
                }),
                emailpassword: (oI) => ({
                    ...oI,
                    doesEmailExist: () => withFetchResponse({ status: "OK", doesExist: false }),
                }),
            },
        }),
    ],
    play: async ({ canvasElement }) => {
        configure({ testIdAttribute: "data-supertokens" });
        // Assigns canvas to the component root element
        const canvas = within(canvasElement);

        const emailInput = await canvas.findByTestId("input input-email");
        await userEvent.type(emailInput, "asdf@asfd.as");
        await new Promise((res) => setTimeout(res, 300));

        const submit = await canvas.findByTestId("button");
        await userEvent.click(submit, { delay: 200 });
        await canvas.findByTestId("input input-password");
    },
};
export const SignInWithEPUser: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: (oI) => ({
                    ...oI,
                    doesEmailExist: () => withFetchResponse({ status: "OK", doesExist: false }),
                }),
                emailpassword: (oI) => ({
                    ...oI,
                    doesEmailExist: () => withFetchResponse({ status: "OK", doesExist: true }),
                }),
            },
        }),
    ],
    play: async ({ canvasElement }) => {
        configure({ testIdAttribute: "data-supertokens" });
        // Assigns canvas to the component root element
        const canvas = within(canvasElement);

        const emailInput = await canvas.findByTestId("input input-email");
        await userEvent.type(emailInput, "asdf@asfd.as");
        await new Promise((res) => setTimeout(res, 300));

        const submit = await canvas.findByTestId("button");
        await userEvent.click(submit, { delay: 200 });
        await canvas.findByTestId("input input-password");
    },
};

export const SignUp: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
        defaultToSignUp: true,
    },
};
export const SignUpPasswordless: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
        defaultToSignUp: true,
    },
    play: async ({ canvasElement }) => {
        // Assigns canvas to the component root element
        const canvas = within(canvasElement);

        const switcher = await canvas.findByText("CONTINUE WITH PASSWORDLESS");
        await new Promise((res) => setTimeout(res, 100));
        canvasElement;
        await userEvent.click(switcher, { delay: 200 });
    },
};

export const SignUpPasskey: Story = {
    args: {
        path: "/auth",
        "multifactorauth.initialized": false,
        "passwordless.initialized": false,
        "webauthn.initialized": true,
        defaultToSignUp: true,
    },
    play: async ({ canvasElement }) => {
        // Assigns canvas to the component root element
        const canvas = within(canvasElement);
        const switcher = await canvas.findByText("CONTINUE WITH PASSKEY");
        await new Promise((res) => setTimeout(res, 100));
        await userEvent.click(switcher, { delay: 200 });
    },
};

export const SignInPasskey: Story = {
    args: {
        path: "/auth",
        "multifactorauth.initialized": false,
        "passwordless.initialized": false,
        "webauthn.initialized": true,
        defaultToSignUp: false,
    },
};

export const RecoverAccountWithToken: Story = {
    args: {
        path: "/auth/webauthn/recover",
        "multifactorauth.initialized": false,
        "passwordless.initialized": false,
        "webauthn.initialized": true,
        query: "token=NThlNDNmMjU4OWRjNDJkYzVmMzhmZDMzMWFkY2YxOTUyYjQ5M2Y2NmNhYjY4MjdmMjJjNTFmMTk0Yzg0MTFkYWUyMTZmNDFlNjFlZWE4MTQ5NWY4ZTMyZWE4OTI1OWUz&tenantId=public",
    },
};

export const SendRecoveryEmail: Story = {
    args: {
        path: "/auth/webauthn/recover/send-email",
        "multifactorauth.initialized": false,
        "passwordless.initialized": false,
        "webauthn.initialized": true,
    },
};

export const SignUpFieldErrors: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
        defaultToSignUp: true,
    },
    play: async ({ canvasElement }) => {
        // Assigns canvas to the component root element
        const canvas = within(canvasElement);

        const emailInput = await canvas.findByPlaceholderText("Email address");
        await new Promise((res) => setTimeout(res, 100));
        await userEvent.type(emailInput, "asdf");
        const passwordInput = await canvas.findByPlaceholderText("Password");

        await userEvent.type(passwordInput, "pw");

        await userEvent.click(canvasElement, { delay: 200 });
    },
};

export const ResetPassword: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
        path: "/auth/reset-password",
    },
};

export const ResetPasswordLinkClicked: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
        path: "/auth/reset-password",
        query: "token=asdf",
    },
};

export const OAuth2Login: Story = {
    args: {
        path: "/auth",
        query: "loginChallenge=asdf",
        "oauth2.initialized": true,
        "oauth2.clientName": "Google",
        "oauth2.logoUri": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
        "oauth2.clientUri": "https://google.com",
    },
};

export const ContactFormCombined: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
};

export const ContactFormCombinedPhone: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
        "passwordless.defaultToEmail": false,
    },
};

export const ContactFormEmail: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email"],
    },
};
export const ContactFormPhone: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-phone"],
    },
};

export const OTPFormPhone: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: overridePWlessWithLoginAttempt({
                    contactInfo: "+36701234567",
                    contactMethod: "PHONE",
                    flowType: "USER_INPUT_CODE",
                    lastResend: Date.now(),
                    deviceId: "asdf",
                    preAuthSessionId: "asdf",
                }),
            },
        }),
    ],
};

export const OTPFormEmail: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: overridePWlessWithLoginAttempt({
                    contactInfo: "test@supertokens.com",
                    contactMethod: "EMAIL",
                    flowType: "USER_INPUT_CODE",
                    lastResend: Date.now(),
                    deviceId: "asdf",
                    preAuthSessionId: "asdf",
                }),
            },
        }),
    ],
};
export const OTPOrLinkEmail: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: overridePWlessWithLoginAttempt({
                    contactInfo: "test@supertokens.com",
                    contactMethod: "EMAIL",
                    flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
                    lastResend: Date.now(),
                    deviceId: "asdf",
                    preAuthSessionId: "asdf",
                }),
            },
        }),
    ],
};

export const OTPOrLinkPhone: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: overridePWlessWithLoginAttempt({
                    contactInfo: "+36701234567",
                    contactMethod: "PHONE",
                    flowType: "USER_INPUT_CODE_AND_MAGIC_LINK",
                    lastResend: Date.now(),
                    deviceId: "asdf",
                    preAuthSessionId: "asdf",
                }),
            },
        }),
    ],
};

export const LinkSentEmail: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: overridePWlessWithLoginAttempt({
                    contactInfo: "test@supertokens.com",
                    contactMethod: "EMAIL",
                    flowType: "MAGIC_LINK",
                    lastResend: Date.now(),
                    deviceId: "asdf",
                    preAuthSessionId: "asdf",
                }),
            },
        }),
    ],
};

export const LinkSentPhone: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: overridePWlessWithLoginAttempt({
                    contactInfo: "+36701234567",
                    contactMethod: "PHONE",
                    flowType: "MAGIC_LINK",
                    lastResend: Date.now(),
                    deviceId: "asdf",
                    preAuthSessionId: "asdf",
                }),
            },
        }),
    ],
};

export const OTPResend: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: overridePWlessWithLoginAttempt({
                    contactInfo: "+36701234567",
                    contactMethod: "PHONE",
                    flowType: "USER_INPUT_CODE",
                    lastResend: Date.now() - 3600000,
                    deviceId: "asdf",
                    preAuthSessionId: "asdf",
                }),
            },
        }),
    ],
};
export const LinkResend: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => ({
            funcOverrides: {
                passwordless: overridePWlessWithLoginAttempt({
                    contactInfo: "+36701234567",
                    contactMethod: "PHONE",
                    flowType: "MAGIC_LINK",
                    lastResend: Date.now() - 3600000,
                    deviceId: "asdf",
                    preAuthSessionId: "asdf",
                }),
            },
        }),
    ],
};

export const Callback: Story = {
    args: {
        path: "/auth/callback/tp",
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword", "otp-email", "otp-phone"],
    },
    loaders: [
        async () => {
            return {
                funcOverrides: {
                    thirdparty: (oI) => {
                        return {
                            ...oI,
                            signInAndUp: () => {
                                return new Promise(() => {});
                            },
                        };
                    },
                },
            };
        },
    ],
};
