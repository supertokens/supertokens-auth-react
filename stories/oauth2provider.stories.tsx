import type { Meta, StoryObj } from "@storybook/react";

import { OAuth2LogoutScreenTheme as Page } from "../lib/ts/recipe/oauth2provider/components/themes/oauth2LogoutScreen";
import React from "react";
import { defaultTranslationsOAuth2Provider } from "../lib/ts/recipe/oauth2provider/components/themes/translations";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";
import { TranslationContextProvider } from "../lib/ts/translation/translationContext";
import { ComponentOverrideContext } from "../lib/ts/components/componentOverride/componentOverrideContext";
import { resetAndInitST } from "./utils";
import { SessionContext } from "../lib/ts/recipe/session";

function noop() {}
WindowHandlerReference.init((oI) => ({ ...oI }));

const defaultSessionContext = {
    loading: false,
    doesSessionExist: true,
    invalidClaims: [],
    accessTokenPayload: {},
    userId: "test-user",
};

const meta: Meta<typeof Page> = {
    title: "OAuth2Provider",
    decorators: [
        (Story, context) => {
            return (
                <SessionContext.Provider value={context.loaded.session ?? defaultSessionContext}>
                    <ComponentOverrideContext.Provider value={{}}>
                        <TranslationContextProvider
                            translationControlEventSource={{ on: noop, off: noop }}
                            defaultLanguage="en"
                            defaultStore={defaultTranslationsOAuth2Provider}>
                            <Story />
                        </TranslationContextProvider>
                    </ComponentOverrideContext.Provider>
                </SessionContext.Provider>
            );
        },
    ],
    component: Page,
    render: (args, ctx) => {
        resetAndInitST();
        return <Page {...args} />;
    },
    argTypes: {
        config: { table: { disable: true } },
    },
    args: {
        showSpinner: false,
        isLoggingOut: false,
        config: {
            oauth2LogoutScreen: { style: "" },
        } as any, // We don't use any config values
    },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const OAuth2LogoutScreen: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?node-id=5018-33&t=u8hfT9V6cJ7b7qEL-0",
        },
    },
    args: {},
};

export const OAuth2LogoutScreenSpinner: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?node-id=5018-33&t=u8hfT9V6cJ7b7qEL-0",
        },
    },
    args: {
        showSpinner: true,
    },
};
