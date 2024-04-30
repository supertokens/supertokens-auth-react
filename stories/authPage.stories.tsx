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
    "emailpassword.disableDefaultUISignInUp": boolean;
    defaultToSignUp: boolean;
    "thirdparty.initialized": boolean;
    "thirdparty.disableDefaultUISignInUp": boolean;
    "thirdparty.providers": ProviderId[];
    "passwordless.initialized": boolean;
    "passwordless.contactMethod": "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";
    "passwordless.disableDefaultUISignInUp": boolean;
    path?: string;
    query?: string;
    hash?: string;
};

const meta: Meta<Args> = {
    title: "Auth page",
    parameters: {
        // Sets the delay (in milliseconds). This will make sure
        chromatic: { delay: 300 },
    },
    render: (args, { loaded: { path, funcOverrides } }) => {
        const { prebuiltUIs, key } = useMemo(() => {
            const { prebuiltUIs, recipeList, defaultToSignUp } = buildInit(unflattenArgs(args), funcOverrides);
            for (const ui of prebuiltUIs) {
                ui.reset();
            }
            resetAndInitST(recipeList, args.usesDynamicLoginMethods, defaultToSignUp, {
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
        "multifactorauth.firstFactors": ["emailpassword", "thirdparty"],
        "multitenancy.initialized": true,
        "multitenancy.firstFactors": ["emailpassword", "thirdparty"],
        "multitenancy.providers": ["github", "google"],
        "emailpassword.initialized": true,
        "emailpassword.disableDefaultUISignInUp": false,
        defaultToSignUp: false,
        "thirdparty.initialized": true,
        "thirdparty.disableDefaultUISignInUp": false,
        "thirdparty.providers": ["github", "google"],
        "passwordless.initialized": true,
        "passwordless.contactMethod": "EMAIL_OR_PHONE",
        "passwordless.disableDefaultUISignInUp": false,
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
        "emailpassword.disableDefaultUISignInUp": {
            table: {
                category: "emailpassword",
            },
            if: {
                arg: "emailpassword.initialized",
                truthy: true,
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
        "thirdparty.disableDefaultUISignInUp": {
            table: {
                category: "thirdparty",
            },
            if: {
                arg: "thirdparty.initialized",
                truthy: true,
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
        "passwordless.disableDefaultUISignInUp": {
            table: {
                category: "passwordless",
            },
            if: {
                arg: "passwordless.initialized",
                truthy: true,
            },
        },
    },
};

export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};
