import type { StorybookConfig } from "@storybook/react-webpack5";
// import '@storybook/addon-console';

const config: StorybookConfig = {
    stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-essentials",
        "@storybook/addon-actions",
        "@storybook/addon-links",
        "@storybook/addon-interactions",
        // "@storybook/addon-actions/register",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: false,
    },
};
export default config;
