import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
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
        "emailpassword.defaultToSignUp": true,
    },
};
export const SignUpFieldErrors: Story = {
    args: {
        path: "/auth",
        "multifactorauth.firstFactors": ["emailpassword"],
        "emailpassword.defaultToSignUp": true,
    },
    play: async ({ canvasElement }) => {
        // Assigns canvas to the component root element
        const canvas = within(canvasElement);

        const emailInput = await canvas.findByPlaceholderText("Email address");
        await new Promise((res) => setTimeout(res, 100));
        await userEvent.type(emailInput, "asdf");
        const passwordInput = await canvas.findByPlaceholderText("Password");

        await userEvent.type(passwordInput, "pw");
        // See https://storybook.js.org/docs/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
        const submitButton = await waitFor(() => canvasElement.querySelector("button[type=submit]"))!;

        await userEvent.click(canvasElement, { delay: 200 });
    },
};
export const SignUpGeneralErrors: Story = {
    args: {
        path: "/auth",
        query: "error=asdf",
        "multifactorauth.firstFactors": ["emailpassword"],
        "emailpassword.defaultToSignUp": true,
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
