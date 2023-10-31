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
    accessTokenPayload: {},
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

const loadSessionContextWithMultipleNextOptions = async () => ({
    session: {
        ...defaultSessionContext,
        accessTokenPayload: {
            ...defaultSessionContext.accessTokenPayload,
            "st-mfa": { c: {}, n: ["otp-phone", "otp-email"] },
        },
    },
});

export const SetupEmailWithBack: Story = {
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
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
            isSetupAllowed: true,
        },
    },
};

export const SetupVerificationWithBack: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
            isSetupAllowed: true,
        },
    },
    loaders: [loadSessionContextWithMultipleNextOptions],
};

export const Verification: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
        },
    },
};

export const VerificationWithBack: Story = {
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
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            loginAttemptInfo: exampleLoginAttemptInfo,
            successInAnotherTab: true,
        },
    },
};
