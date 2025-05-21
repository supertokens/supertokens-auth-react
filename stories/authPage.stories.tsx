import type { Meta, StoryObj } from "@storybook/react";

import Page from "../lib/ts/recipe/totp/components/themes/mfa";
import React, { useMemo } from "react";
import { resetAndInitST, buildInit, ProviderId, FirstFactor, unflattenArgs } from "./utils";
import { RoutingComponent } from "../lib/ts/components/routingComponent";
import { ErrorBoundary } from "./errorBoundary";

export type Args = {
    usesDynamicLoginMethods: boolean;
    "multifactorauth.initialized": boolean;
    "multifactorauth.firstFactors": FirstFactor[] | undefined;
    "multitenancy.initialized": boolean;
    "multitenancy.firstFactors": FirstFactor[];
    "multitenancy.providers": ProviderId[];
    "emailpassword.initialized": boolean;
    defaultToSignUp: boolean;
    "thirdparty.initialized": boolean;
    "thirdparty.providers": ProviderId[];
    "passwordless.initialized": boolean;
    "webauthn.initialized": boolean;
    "passwordless.contactMethod": "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";
    "passwordless.defaultToEmail": boolean;
    "oauth2.initialized": boolean;
    "oauth2.clientName": string;
    "oauth2.logoUri": string;
    "oauth2.clientUri": string;
    path?: string;
    query?: string;
    hash?: string;
    rootStyle?: string;
};

const meta: Meta<Args> = {
    title: "Auth page",
    parameters: {
        // Sets the delay (in milliseconds). This will make sure
        chromatic: { delay: 600 },
    },
    render: (args, { loaded: { path, funcOverrides } }) => {
        const { prebuiltUIs, key } = useMemo(() => {
            const { prebuiltUIs, recipeList, defaultToSignUp } = buildInit(unflattenArgs(args), funcOverrides);
            for (const ui of prebuiltUIs) {
                ui.reset();
            }
            resetAndInitST(recipeList, args.usesDynamicLoginMethods, defaultToSignUp, args.rootStyle, {
                path: args.path ?? path ?? "/auth",
                query: args.query ?? "",
                hash: args.hash ?? "",
            });
            return { prebuiltUIs, key: JSON.stringify(args) };
        }, [args]);

        return (
            <ErrorBoundary key={key}>
                <style>
                    {`
                    *, *::before, *::after {
                        animation-delay: -1s !important;
                        animation-duration: 0s !important;
                        animation-iteration-count: 1 !important;
                        background-attachment: initial !important;
                        scroll-behavior: auto !important;
                        transition-duration: 0s !important;
                        transition: none !important;
                    }

                    img, video, iframe {
                        background: blue !important;
                        filter: brightness(1) contrast(0) !important;
                    }

                    svg {
                        shape-rendering: geometricPrecision !important;
                    }

                    #storybook-root {
                        padding: 1rem 0;
                    }`}
                </style>
                <RoutingComponent
                    key={key}
                    path={args.path ?? path ?? "/auth"}
                    preBuiltUIList={prebuiltUIs.map((c) => c.getInstanceOrInitAndGetInstance())}
                    getReactRouterDomWithCustomHistory={() => undefined}
                />
            </ErrorBoundary>
        );
    },
    args: {
        usesDynamicLoginMethods: false,
        "multifactorauth.initialized": true,
        "multifactorauth.firstFactors": [
            "emailpassword",
            "thirdparty",
            "otp-email",
            "otp-phone",
            "link-email",
            "link-phone",
        ],
        "multitenancy.initialized": true,
        "multitenancy.firstFactors": ["emailpassword", "thirdparty"],
        "multitenancy.providers": ["github", "google"],
        "emailpassword.initialized": true,
        defaultToSignUp: false,
        "thirdparty.initialized": true,
        "thirdparty.providers": ["github", "google"],
        "passwordless.initialized": true,
        "webauthn.initialized": true,
        "passwordless.contactMethod": "EMAIL_OR_PHONE",
        "passwordless.defaultToEmail": true,
        rootStyle: "",
        "oauth2.initialized": true,
        "oauth2.clientName": "My App",
        "oauth2.logoUri": "https://example.com/logo.png",
        "oauth2.clientUri": "https://example.com",
    },
    argTypes: {
        "multifactorauth.initialized": {
            table: {
                category: "multifactorauth",
            },
        },
        "multifactorauth.firstFactors": {
            options: ["otp-phone", "otp-email", "link-phone", "link-email", "emailpassword", "thirdparty"],
            control: {
                type: "check",
            },
            table: {
                category: "multifactorauth",
            },
            if: {
                arg: "multifactorauth.initialized",
                truthy: true,
            },
        },
        "multitenancy.initialized": {
            table: {
                category: "multitenancy",
            },
        },
        "multitenancy.firstFactors": {
            options: ["otp-phone", "otp-email", "link-phone", "link-email", "emailpassword", "thirdparty"],
            control: {
                type: "check",
            },
            table: {
                category: "multitenancy",
            },
            if: {
                arg: "multitenancy.initialized",
                truthy: true,
            },
        },
        "multitenancy.providers": {
            options: ["google", "github"],
            control: {
                type: "check",
            },
            table: {
                category: "multitenancy",
            },
            if: {
                arg: "multitenancy.initialized",
                truthy: true,
            },
        },
        "emailpassword.initialized": {
            table: {
                category: "emailpassword",
            },
        },
        defaultToSignUp: {
            if: {
                arg: "emailpassword.initialized",
                truthy: true,
            },
        },
        "thirdparty.initialized": {
            table: {
                category: "thirdparty",
            },
        },
        "thirdparty.providers": {
            options: ["google", "github"],
            control: {
                type: "check",
            },
            table: {
                category: "thirdparty",
            },
            if: {
                arg: "thirdparty.initialized",
                truthy: true,
            },
        },
        "passwordless.initialized": {
            table: {
                category: "passwordless",
            },
        },
        "webauthn.initialized": {
            table: {
                category: "webauthn",
            },
        },
        "passwordless.contactMethod": {
            options: ["EMAIL", "PHONE", "EMAIL_OR_PHONE"],
            control: {
                type: "radio",
            },
            table: {
                category: "passwordless",
            },
            if: {
                arg: "passwordless.initialized",
                truthy: true,
            },
        },
        "passwordless.defaultToEmail": {
            table: {
                category: "passwordless",
            },
            if: {
                arg: "passwordless.initialized",
                truthy: true,
            },
        },
        "oauth2.initialized": {
            table: {
                category: "oauth2",
            },
        },
        "oauth2.clientName": {
            table: {
                category: "oauth2",
            },
            if: {
                arg: "oauth2.initialized",
                truthy: true,
            },
        },
        "oauth2.logoUri": {
            table: {
                category: "oauth2",
            },
            if: {
                arg: "oauth2.initialized",
                truthy: true,
            },
        },
        "oauth2.clientUri": {
            table: {
                category: "oauth2",
            },
            if: {
                arg: "oauth2.initialized",
                truthy: true,
            },
        },
    },
};

export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};
