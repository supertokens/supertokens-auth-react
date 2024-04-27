import type { Meta, StoryObj } from "@storybook/react";

import Page from "../lib/ts/recipe/multifactorauth/components/themes/factorChooser";
import React from "react";
import { defaultTranslationsMultiFactorAuth } from "../lib/ts/recipe/multifactorauth/components/themes/translations";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";
import { TranslationContextProvider } from "../lib/ts/translation/translationContext";
import { ComponentOverrideContext } from "../lib/ts/components/componentOverride/componentOverrideContext";
import { resetAndInitST } from "./utils";
import { SessionContext } from "../lib/ts/recipe/session";
import { otpEmailFactor, otpPhoneFactor } from "../lib/ts/recipe/passwordless/recipe";
import { totpFactor } from "../lib/ts/recipe/totp/recipe";

function noop() {}
WindowHandlerReference.init((oI) => ({ ...oI }));

const factors = [otpEmailFactor, otpPhoneFactor, totpFactor];

const defaultSessionContext = {
    loading: false,
    doesSessionExist: true,
    invalidClaims: [],
    accessTokenPayload: {},
    userId: "test-user",
};
const meta: Meta<typeof Page> = {
    title: "MFA/chooser",
    decorators: [
        (Story, context) => {
            return (
                <SessionContext.Provider value={context.loaded.session ?? defaultSessionContext}>
                    <ComponentOverrideContext.Provider value={{}}>
                        <TranslationContextProvider
                            translationControlEventSource={{ on: noop, off: noop }}
                            defaultLanguage="en"
                            defaultStore={defaultTranslationsMultiFactorAuth}>
                            <Story />
                        </TranslationContextProvider>
                    </ComponentOverrideContext.Provider>
                </SessionContext.Provider>
            );
        },
    ],
    component: Page,
    render: (args) => {
        resetAndInitST();
        return (
            <Page
                {...args}
                availableFactors={(args.availableFactors as any).map((id) =>
                    factors.find((factor) => factor.id === id)
                )}
            />
        );
    },
    argTypes: {
        availableFactors: { control: "check", options: ["otp-email", "otp-phone", "totp"] },
        navigateToFactor: { action: "navigateToFactor" },
        userContext: {
            table: {
                disable: true,
            },
        },
    },
    args: {
        availableFactors: [],
        showBackButton: false,
        config: {
            factorChooserScreen: {
                style: "",
            },
            firstFactors: [],
            rootStyle: "",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const NoFactors: Story = {
    args: {
        availableFactors: [],
    },
};

export const SingleFactor: Story = {
    args: {
        availableFactors: ["otp-email"],
    },
};

export const MultipleFactors: Story = {
    args: {
        availableFactors: ["otp-email", "otp-phone", "totp"],
    },
};
