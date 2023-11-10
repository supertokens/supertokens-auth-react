import type { Meta, StoryObj } from "@storybook/react";

import Page from "../lib/ts/recipe/totp/components/themes/mfa";
import React, { useMemo, useState } from "react";
import { AuthPageConf, resetAndInitST, buildInit, ProviderId, FirstFactor, unflattenArgs } from "./utils";
import { RoutingComponent } from "../lib/ts/components/routingComponent";
import { passwordlessFactors } from "../lib/ts/recipe/passwordless/recipe";
import { ErrorBoundary } from "./errorBoundary";

const meta: Meta<{
    usesDynamicLoginMethods: boolean;
    "multifactorauth.initialized": boolean;
    "multifactorauth.firstFactors": FirstFactor[] | undefined;
    "multifactorauth.disableDefaultUI": boolean;
    "multitenancy.initialized": boolean;
    "multitenancy.firstFactors": FirstFactor[];
    "multitenancy.providers": ProviderId[];
    "emailpassword.initialized": boolean;
    "emailpassword.disableDefaultUISignInUp": boolean;
    "thirdparty.initialized": boolean;
    "thirdparty.disableDefaultUISignInUp": boolean;
    "thirdparty.providers": ProviderId[];
    "passwordless.initialized": boolean;
    "passwordless.contactMethod": "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";
    "passwordless.disableDefaultUISignInUp": boolean;
    "thirdpartyemailpassword.initialized": boolean;
    "thirdpartyemailpassword.disableDefaultUISignInUp": boolean;
    "thirdpartyemailpassword.providers": ProviderId[] | undefined;
    "thirdpartyemailpassword.disableEmailPassword": boolean;
    "thirdpartypasswordless.initialized": boolean;
    "thirdpartypasswordless.disableDefaultUISignInUp": boolean;
    "thirdpartypasswordless.providers": ProviderId[] | undefined;
    "thirdpartypasswordless.contactMethod": "PHONE" | "EMAIL" | "EMAIL_OR_PHONE";
    "thirdpartypasswordless.disablePasswordless": boolean;
}> = {
    title: "Auth page",
    render: (args, { loaded: { featureState } }) => {
        const { prebuiltUIs, key } = useMemo(() => {
            const { prebuiltUIs, recipeList } = buildInit(unflattenArgs(args));
            resetAndInitST(recipeList, args.usesDynamicLoginMethods);
            return { prebuiltUIs, key: JSON.stringify(args) };
        }, [args]);

        return (
            <ErrorBoundary key={key}>
                <RoutingComponent
                    key={key}
                    path="/auth"
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
        "multifactorauth.disableDefaultUI": false,
        "multitenancy.initialized": true,
        "multitenancy.firstFactors": ["emailpassword", "thirdparty"],
        "multitenancy.providers": ["github", "google"],
        "emailpassword.initialized": true,
        "emailpassword.disableDefaultUISignInUp": false,
        "thirdparty.initialized": true,
        "thirdparty.disableDefaultUISignInUp": false,
        "thirdparty.providers": ["github", "google"],
        "passwordless.initialized": true,
        "passwordless.contactMethod": "EMAIL_OR_PHONE",
        "passwordless.disableDefaultUISignInUp": false,
        "thirdpartyemailpassword.initialized": true,
        "thirdpartyemailpassword.disableDefaultUISignInUp": false,
        "thirdpartyemailpassword.providers": ["github", "google"],
        "thirdpartyemailpassword.disableEmailPassword": false,
        "thirdpartypasswordless.initialized": true,
        "thirdpartypasswordless.disableDefaultUISignInUp": false,
        "thirdpartypasswordless.providers": ["github", "google"],
        "thirdpartypasswordless.contactMethod": "EMAIL_OR_PHONE",
        "thirdpartypasswordless.disablePasswordless": false,
    },
    argTypes: {
        "multifactorauth.initialized": {
            table: {
                category: "multifactorauth",
            },
        },
        "multifactorauth.firstFactors": {
            options: [...passwordlessFactors, "emailpassword", "thirdparty"],
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
        "multifactorauth.disableDefaultUI": {
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
            options: [...passwordlessFactors, "emailpassword", "thirdparty"],
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
        "thirdpartyemailpassword.initialized": {
            table: {
                category: "thirdpartyemailpassword",
            },
        },
        "thirdpartyemailpassword.disableDefaultUISignInUp": {
            table: {
                category: "thirdpartyemailpassword",
            },
            if: {
                arg: "thirdpartyemailpassword.initialized",
                truthy: true,
            },
        },
        "thirdpartyemailpassword.providers": {
            table: {
                category: "thirdpartyemailpassword",
            },
            if: {
                arg: "thirdpartyemailpassword.initialized",
                truthy: true,
            },
        },
        "thirdpartyemailpassword.disableEmailPassword": {
            table: {
                category: "thirdpartyemailpassword",
            },
            if: {
                arg: "thirdpartyemailpassword.initialized",
                truthy: true,
            },
        },
        "thirdpartypasswordless.initialized": {
            table: {
                category: "thirdpartypasswordless",
            },
        },
        "thirdpartypasswordless.disableDefaultUISignInUp": {
            table: {
                category: "thirdpartypasswordless",
            },
            if: {
                arg: "thirdpartypasswordless.initialized",
                truthy: true,
            },
        },
        "thirdpartypasswordless.providers": {
            table: {
                category: "thirdpartypasswordless",
            },
            if: {
                arg: "thirdpartypasswordless.initialized",
                truthy: true,
            },
        },
        "thirdpartypasswordless.contactMethod": {
            options: ["EMAIL", "PHONE", "EMAIL_OR_PHONE"],
            control: {
                type: "radio",
            },
            table: {
                category: "thirdpartypasswordless",
            },
            if: {
                arg: "thirdpartypasswordless.initialized",
                truthy: true,
            },
        },
        "thirdpartypasswordless.disablePasswordless": {
            table: {
                category: "thirdpartypasswordless",
            },
            if: {
                arg: "thirdpartypasswordless.initialized",
                truthy: true,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Page>;

export const AllRecipes: Story = {};
