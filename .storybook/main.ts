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
        "@storybook/addon-designs",
    ],
    async webpackFinal(config, { configType }) {
        if (config.module?.rules) {
            // By default, Storybook utilizes the style-loader, injecting CSS directly into the DOM.
            // In our build process, we import the CSS string and embed it within a style tag.
            // The follwoing changes ensure that we replicate this behavior in Storybook.
            config.module.rules = config.module.rules.filter(
                (rule) => !(typeof rule === "object" && rule?.test instanceof RegExp && rule.test.test(".css"))
            );

            config.module.rules.push({
                test: /\.css$/,
                use: ["to-string-loader", "css-loader"],
            });
        }
        return config;
    },
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: false,
    },
    env: {
        REACT_APP_TEST_MODE: "testing",
        TEST_MODE: "testing",
    },
};
export default config;
