import type { Meta, StoryObj } from "@storybook/react";
import meta, { Args } from "./authPage.stories";

type Story = StoryObj<Args>;

export default {
    ...meta,
    title: "ThirdParty/Auth",
};

export const SignInUp: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty"],
    },
};

export const SignInUpError: Story = {
    args: {
        "multifactorauth.firstFactors": ["thirdparty"],
        query: "error=signin",
    },
};

export const Callback: Story = {
    args: {
        path: "/auth/callback/tp",
        "multifactorauth.firstFactors": ["thirdparty"],
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
