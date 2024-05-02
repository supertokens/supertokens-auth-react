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
