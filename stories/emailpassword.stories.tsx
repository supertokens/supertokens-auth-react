import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/test";
import meta, { Args } from "./authPage.stories";

type Story = StoryObj<Args>;

export default {
    ...meta,
    title: "EmailPassword/Auth",
};

export const SignIn: Story = {
    args: {
        "multifactorauth.firstFactors": ["emailpassword"],
    },
};
export const SignUp: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["emailpassword"],
        defaultToSignUp: true,
    },
};
export const SignUpFieldErrors: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["emailpassword"],
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
        "multifactorauth.firstFactors": ["emailpassword"],
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
