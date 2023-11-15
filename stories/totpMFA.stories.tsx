import type { Meta, StoryObj } from "@storybook/react";
import { action, actions } from "@storybook/addon-actions";

import Page from "../lib/ts/recipe/totp/components/themes/mfa";
import React from "react";
import { defaultTranslationsTOTP } from "../lib/ts/recipe/totp/components/themes/translations";
import { TranslationContextProvider } from "../lib/ts/translation/translationContext";
import { ComponentOverrideContext } from "../lib/ts/components/componentOverride/componentOverrideContext";
import { userEvent, within, waitFor } from "@storybook/testing-library";
import { resetAndInitST, withFetchResponse } from "./utils";
import { SessionContext } from "../lib/ts/recipe/session";

function noop() {}

const defaultState = {
    isBlocked: false,
    error: undefined,
    loaded: true,
    showBackButton: true,
    showSecret: false,
    deviceInfo: undefined,
    nextRetryAt: undefined,
};

const exampleDeviceInfo = {
    qrCodeString: "otpauth://totp/SuperTokens:alice@supertokens.com?secret=JBSWY3DPEHPK3PXP&issuer=SuperTokens",
    secret: "JBSWY3DPEHPK3PXP",
    deviceName: "unnamed-1",
    issuerName: "supertokens",
    userIdentifier: "alice",
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
    title: "TOTP/MFA",
    decorators: [
        (Story, context) => (
            <SessionContext.Provider value={context.loaded.session ?? defaultSessionContext}>
                <ComponentOverrideContext.Provider value={{}}>
                    <TranslationContextProvider
                        translationControlEventSource={{ on: noop, off: noop }}
                        defaultLanguage="en"
                        defaultStore={defaultTranslationsTOTP}>
                        <Story />
                    </TranslationContextProvider>
                </ComponentOverrideContext.Provider>
            </SessionContext.Provider>
        ),
    ],
    component: Page,
    render: (args, { loaded: { featureState } }) => {
        resetAndInitST();

        return <Page {...args} featureState={{ ...args.featureState, ...featureState }} />;
    },
    args: {
        featureState: defaultState,
        config: {
            rootStyle: "",
            totpMFAScreen: {
                disableDefaultUI: false,
                blockedScreenStyle: "",
                loadingScreenStyle: "",
                setupScreenStyle: "",
                verificationScreenStyle: "",
            },
            useShadowDom: false,
        } as any, // We are not using any other config values
        recipeImplementation: {
            createDevice: async () => {
                action("called verifyCode");
                return withFetchResponse({ status: "OK", ...exampleDeviceInfo });
            },
            listDevices: async () => {
                action("called verifyCode");
                return withFetchResponse({ status: "OK", devices: [] });
            },
            removeDevice: async () => {
                action("called verifyCode");
                return withFetchResponse({ status: "OK", didDeviceExist: true });
            },
            verifyCode: async () => {
                action("called verifyCode");
                return withFetchResponse({ status: "OK" });
            },
            verifyDevice: async () => {
                action("called verifyDevice");
                return withFetchResponse({ status: "OK", wasAlreadyVerified: false });
            },
        }, // the impl only uses those two functions
        dispatch: (event) => {
            action("dispatching " + JSON.stringify(event));
        },
        onSuccess: () => {
            action("called onSuccess");
        },
        onBackButtonClicked: () => {
            action("called onBackButtonClicked");
        },
        onRetryClicked: () => {
            action("called onRetryClicked");
        },
        onShowSecretClick: () => {
            action("called onShowSecretClick");
        },
        onSignOutClicked: () => {
            action("called onSignOutClicked");
        },
    },
};

const loadSessionContextWithSingleNextOption = async () => ({
    session: {
        ...defaultSessionContext,
        accessTokenPayload: {
            ...defaultSessionContext.accessTokenPayload,
            "st-mfa": { c: {}, n: ["totp"] },
        },
    },
});

const loadSessionContextWithMultipleNextOptions = async () => ({
    session: {
        ...defaultSessionContext,
        accessTokenPayload: {
            ...defaultSessionContext.accessTokenPayload,
            "st-mfa": { c: {}, n: ["totp", "otp-phone", "otp-email"] },
        },
    },
});

export default meta;
type Story = StoryObj<typeof Page>;

export const DeviceSetup: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            deviceInfo: exampleDeviceInfo,
        },
    },
};

export const DeviceSetupWithSingleNextOption: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            deviceInfo: exampleDeviceInfo,
            showBackButton: false,
        },
    },
    loaders: [loadSessionContextWithSingleNextOption],
};

export const DeviceSetupMultipleNextOptions: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            deviceInfo: exampleDeviceInfo,
            showBackButton: false,
        },
    },
    loaders: [loadSessionContextWithMultipleNextOptions],
};

export const DeviceSetupAccessDenied: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            error: "TOTP_MFA_NOT_ALLOWED_TO_SETUP",
            deviceInfo: undefined,
        },
    },
};

export const DeviceSetupWithSecret: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            deviceInfo: exampleDeviceInfo,
            showSecret: true,
        },
    },
};

export const DeviceSetupEmptySubmit: Story = {
    args: {
        featureState: {
            ...defaultState,
            error: "GENERAL_ERROR_OTP_UNDEFINED",
            loaded: true,
            deviceInfo: exampleDeviceInfo,
        },
    },
};

export const DeviceSetupInvalidTOTP: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            deviceInfo: exampleDeviceInfo,
            error: "ERROR_TOTP_INVALID_CODE",
            maxAttemptCount: 5,
            currAttemptCount: 1,
        },
    },
};

export const Verification: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            deviceInfo: undefined,
        },
    },
};

export const VerificationWithSingleNextOption: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            deviceInfo: undefined,
            showBackButton: false,
        },
    },
    loaders: [loadSessionContextWithSingleNextOption],
};

export const VerificationWithMultipleNextOption: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            deviceInfo: undefined,
            showBackButton: false,
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
            deviceInfo: undefined,
        },
    },
};

export const VerificationGeneralError: Story = {
    args: {
        featureState: {
            ...defaultState,
            error: "SOMETHING_WENT_WRONG_ERROR",
            loaded: true,
            deviceInfo: undefined,
        },
    },
};

export const VerificationInvalidTOTP: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: true,
            deviceInfo: undefined,
            error: "ERROR_TOTP_INVALID_CODE",
            maxAttemptCount: 5,
            currAttemptCount: 1,
        },
    },
};

export const Blocked: Story = {
    loaders: [
        async () => ({
            featureState: {
                ...defaultState,
                loaded: true,
                deviceInfo: undefined,
                isBlocked: true,
                nextRetryAt: Date.now() + 300000,
            },
        }),
    ],
};

export const Loading: Story = {
    args: {
        featureState: {
            ...defaultState,
            loaded: false,
        },
    },
};
