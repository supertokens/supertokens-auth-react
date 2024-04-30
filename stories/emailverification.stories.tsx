import type { Meta, StoryObj } from "@storybook/react";
import { ErrorBoundary } from "./errorBoundary";
import { RoutingComponent } from "../lib/ts/components/routingComponent";
import EmailVerification from "../lib/ts/recipe/emailverification";
import { EmailVerificationPreBuiltUI } from "../lib/ts/recipe/emailverification/prebuiltui";
import React, { useMemo } from "react";
import { resetAndInitST, withFetchResponse } from "./utils";
import Session from "../lib/ts/recipe/session";

type Args = {
    initialized: boolean;
    path?: string;
    query?: string;
};
type Story = StoryObj<Args>;

export default {
    title: "EmailVerification",

    render: (args) => {
        const { prebuiltUIs, key } = useMemo(() => {
            const prebuiltUIs = [EmailVerificationPreBuiltUI];
            const recipeList = [
                EmailVerification.init({
                    mode: "OPTIONAL",
                    override: {
                        functions: (oI) => ({
                            ...oI,
                            isEmailVerified: async () => withFetchResponse({ status: "OK", isVerified: false }),
                            sendVerificationEmail: async () => withFetchResponse({ status: "OK" }),
                            verifyEmail: () => new Promise((res) => {}),
                        }),
                    },
                }),
                Session.init({
                    override: {
                        functions: (oI) => ({
                            ...oI,
                            getUserId: async () => "test-userid",
                            doesSessionExist: async () => true,
                            getAccessTokenPayloadSecurely: async () => ({
                                "st-ev": {
                                    v: false,
                                    t: Date.now(),
                                },
                            }),
                        }),
                    },
                }),
            ];
            for (const ui of prebuiltUIs) {
                ui.reset();
            }
            resetAndInitST(recipeList, args.usesDynamicLoginMethods, undefined, {
                path: args.path,
                query: args.query,
                hash: args.hash,
            });
            return { prebuiltUIs, key: JSON.stringify(args) };
        }, [args]);

        return (
            <ErrorBoundary key={key}>
                <RoutingComponent
                    key={key}
                    path={args.path ?? "/auth"}
                    preBuiltUIList={prebuiltUIs.map((c) => c.getInstanceOrInitAndGetInstance())}
                    getReactRouterDomWithCustomHistory={() => undefined}
                />
            </ErrorBoundary>
        );
    },
    args: {
        path: "/auth/verify-email",
        query: "",
    },
};

export const SentEmail: Story = {};
export const LinkCliked: Story = {
    args: {
        path: "/auth/verify-email",
        query: "token=asdf",
    },
};
