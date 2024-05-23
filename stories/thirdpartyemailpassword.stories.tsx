import type { Meta, StoryObj } from "@storybook/react";
import meta, { Args } from "./authPage.stories";

type Story = StoryObj<Args>;

export default {
    ...meta,
    title: "ThirdPartyEmailPassword/Auth",
};

export const SignIn: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword"],
    },
};
export const SignUp: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword"],
        defaultToSignUp: true,
    },
};
export const ResetPassword: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword"],
        path: "/auth/reset-password",
    },
};

export const ResetPasswordLinkClicked: Story = {
    args: {
        "multifactorauth.firstFactors": ["emailpassword"],
        path: "/auth/reset-password",
        query: "token=asdf",
    },
};

export const Callback: Story = {
    args: {
        path: "/auth/callback/tp",
        "multifactorauth.firstFactors": ["thirdparty", "emailpassword"],
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
