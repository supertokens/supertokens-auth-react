import type { Meta, StoryObj } from "@storybook/react";
import meta, { Args } from "./authPage.stories";
import { overridePWlessWithLoginAttempt } from "./utils";
import { within } from "@storybook/testing-library";
import userEvent from "@testing-library/user-event";

type Story = StoryObj<Args>;

export default {
    ...meta,
    title: "Passwordless/Auth",
};

export const ContactFormCombined: Story = {
    args: {
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
    },
};
export const ContactFormCombinedPhone: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
        "passwordless.defaultToEmail": false,
    },
};

export const ContactFormEmail: Story = {
    args: {
        "multifactorauth.firstFactors": ["otp-email"],
    },
};
export const ContactFormPhone: Story = {
    args: {
        "multifactorauth.firstFactors": ["otp-phone"],
    },
};

export const OTPFormPhone: Story = {
    args: {
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
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
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
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
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
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
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
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
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
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
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
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
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
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
        "multifactorauth.firstFactors": ["otp-email", "otp-phone"],
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
