import type { Meta, StoryObj } from "@storybook/react";

import Page from "../lib/ts/recipe/passwordless/components/themes/mfa";
import React from "react";
import { defaultTranslationsPasswordless } from "../lib/ts/recipe/passwordless/components/themes/translations";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";
import { TranslationContextProvider } from "../lib/ts/translation/translationContext";
import { ComponentOverrideContext } from "../lib/ts/components/componentOverride/componentOverrideContext";
import { LoginAttemptInfo } from "../lib/ts/recipe/passwordless/types";
import { resetAndInitST, withFetchResponse } from "./utils";
import { defaultGuessInternationPhoneNumberFromInputPhoneNumber } from "../lib/ts/recipe/passwordless/validators";
import { SessionContext } from "../lib/ts/recipe/session";

function noop() {}
WindowHandlerReference.init((oI) => ({ ...oI }));

const defaultState = {
    isSetupAllowed: false,
    loginAttemptInfo: undefined,
    loaded: true,
    successInAnotherTab: false,
    error: undefined,
};

const exampleLoginAttemptInfo: LoginAttemptInfo = {
    contactInfo: "test@supertokens.com",
    contactMethod: "EMAIL",
    deviceId: "asdfasfdafds",
    flowType: "USER_INPUT_CODE",
    lastResend: Date.now() - 60000,
    preAuthSessionId: "asdfasdfasdfasdf",
};

const defaultSessionContext = {
    loading: false,
    doesSessionExist: true,
    invalidClaims: [],
    accessTokenPayload: {
        "st-mfa": {
            c: {},
            n: [],
        },
    },
    userId: "test-user",
};

const meta: Meta<typeof Page> = {
    title: "Passwordless/MFA",
    decorators: [
        (Story, context) => {
            return (
                <SessionContext.Provider value={context.loaded.session ?? defaultSessionContext}>
                    <ComponentOverrideContext.Provider value={{}}>
                        <TranslationContextProvider
                            translationControlEventSource={{ on: noop, off: noop }}
                            defaultLanguage="en"
                            defaultStore={defaultTranslationsPasswordless}>
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
        return <Page {...args} featureState={{ ...args.featureState, ...ctx.loaded.featureState }} />;
    },
    argTypes: {
        config: { table: { disable: true } },
        recipeImplementation: { table: { disable: true } },
    },
    args: {
        contactMethod: "EMAIL",
        featureState: defaultState,
        config: {
            rootStyle: "",
            contactMethod: "EMAIL_OR_PHONE",
            mfaFeature: {
                style: "",
            },
            signInUpFeature: {
                userInputCodeFormStyle: "",
                closeTabScreenStyle: "",
                emailOrPhoneFormStyle: "",
                linkSentScreenStyle: "",
                resendEmailOrSMSGapInSeconds: 30,
                guessInternationPhoneNumberFromInputPhoneNumber: defaultGuessInternationPhoneNumberFromInputPhoneNumber,
            },
            useShadowDom: false,
        } as any, // We are not using any other config values
        recipeImplementation: {
            consumeCode: async () => {
                return withFetchResponse({ status: "OK", user: {} as any, createdNewRecipeUser: false });
            },
        }, // the impl only uses those two functions
    },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const SetupEmail: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4445%3A325&mode=design&t=xmFo6EAIGYXc84iG-1",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: undefined,
            isSetupAllowed: true,
        },
    },
};

export const SetupPhone: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4445%3A347&mode=dev",
        },
    },
    args: {
        contactMethod: "PHONE",
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: undefined,
            isSetupAllowed: true,
        },
    },
};

const loadSessionContextWithSingleNextOption = async () => ({
    session: {
        ...defaultSessionContext,
        accessTokenPayload: {
            ...defaultSessionContext.accessTokenPayload,
            "st-mfa": { c: {}, n: ["otp-email"] },
        },
    },
});

const loadSessionContextWithMultipleNextOptions = async () => ({
    session: {
        ...defaultSessionContext,
        accessTokenPayload: {
            ...defaultSessionContext.accessTokenPayload,
            "st-mfa": { c: {}, n: ["otp-phone", "otp-email"] },
        },
    },
});

export const SetupSingleNextOption: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A370&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: undefined,
            isSetupAllowed: true,
        },
    },
    loaders: [loadSessionContextWithSingleNextOption],
};
export const SetupWithMultipleNextOptions: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A390&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: undefined,
            isSetupAllowed: true,
        },
    },
    loaders: [loadSessionContextWithMultipleNextOptions],
};

export const SetupDenied: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A408&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: undefined,
            isSetupAllowed: false,
            error: "PWLESS_MFA_OTP_NOT_ALLOWED_TO_SETUP",
        },
    },
};

export const SetupVerification: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A426&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
            isSetupAllowed: true,
        },
    },
};

export const Verification: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A447&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
        },
    },
};

export const VerificationWithSingleNextOption: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A472&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
            isSetupAllowed: false,
        },
    },
    loaders: [loadSessionContextWithSingleNextOption],
};

export const VerificationWithMultipleNextOptions: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A496&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
            isSetupAllowed: false,
        },
    },
    loaders: [loadSessionContextWithMultipleNextOptions],
};

export const VerificationEmptySubmit: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A525&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            error: "GENERAL_ERROR_OTP_UNDEFINED",
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
        },
    },
};

export const VerificationInvalidOTP: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A553&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
            error: "GENERAL_ERROR_OTP_INVALID",
        },
    },
};

export const VerificationExpiredOTP: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A581&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
            error: "GENERAL_ERROR_OTP_EXPIRED",
        },
    },
};

export const SuccessInAnotherTab: Story = {
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/file/FlU5eMznAw68y5XU3pRVyZ/Homepage-and-pricing-page?type=design&node-id=4446%3A840&mode=dev",
        },
    },
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
            successInAnotherTab: true,
        },
    },
};
