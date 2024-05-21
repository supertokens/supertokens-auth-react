import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import SuperTokens from "../../lib/ts/superTokens";
import Session from "../../lib/ts/recipe/session/recipe";
import ThirdParty from "../../lib/ts/recipe/thirdparty/recipe";
import EmailPassword from "../../lib/ts/recipe/emailpassword/recipe";
import Passwordless from "../../lib/ts/recipe/passwordless/recipe";
import { Github } from "../../lib/ts/recipe/thirdparty";
import { AuthPage } from "../../lib/ts/ui";
import { ThirdPartyPreBuiltUI } from "../../lib/ts/recipe/thirdparty/prebuiltui";
import { PasswordlessPreBuiltUI } from "../../lib/ts/recipe/passwordless/prebuiltui";
import { EmailPasswordPreBuiltUI } from "../../lib/ts/recipe/emailpassword/prebuiltui";
import { SessionContextType } from "../../lib/ts/recipe/session";
import assert from "assert";
import { act } from "react-dom/test-utils";

const MockSession = {
    addEventListener: jest.fn(),
    getUserId: jest.fn(),
    getAccessTokenPayloadSecurely: jest.fn(),
    doesSessionExist: jest.fn(),
    validateClaims: jest.fn(),
    validateGlobalClaimsAndHandleSuccessRedirection: jest.fn().mockReturnValue(new Promise(() => {})),
    config: {
        onHandleEvent: jest.fn(),
    },
};

const setMockResolvesSession = (ctx: SessionContextType) => {
    if (ctx.loading === true) {
        // We "simulate" loading by returning these promises that won't ever resolve
        MockSession.getUserId.mockReturnValue(new Promise<any>(() => {}));
        MockSession.getAccessTokenPayloadSecurely.mockReturnValue(new Promise<any>(() => {}));
        MockSession.doesSessionExist.mockReturnValue(new Promise<any>(() => {}));
        MockSession.validateClaims.mockReturnValue(new Promise<any>(() => {}));
    } else {
        MockSession.getUserId.mockResolvedValue(ctx.userId);
        MockSession.getAccessTokenPayloadSecurely.mockResolvedValue(ctx.accessTokenPayload);
        MockSession.doesSessionExist.mockResolvedValue(ctx.doesSessionExist);
        MockSession.validateClaims.mockReturnValue(ctx.invalidClaims);
    }
};

jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

describe("AuthPage", () => {
    const websiteDomain = "http://localhost:3000";
    beforeEach(() => {
        jest.clearAllMocks();
        ThirdParty.reset();
        EmailPassword.reset();
        Passwordless.reset();
        Github.reset();
        SuperTokens.reset();

        SuperTokens.init({
            appInfo: {
                apiBasePath: "/auth",
                apiDomain: "http://localhost:3001",
                appName: "JestTest",
                websiteBasePath: "/auth",
                websiteDomain,
            },
            useShadowDom: false,
            recipeList: [
                ThirdParty.init({
                    signInAndUpFeature: {
                        providers: [
                            Github.init(),
                            {
                                id: "custom",
                                name: "Custom",
                                logo: <span>LOGO</span>,
                            },
                        ],
                    },
                }),
                EmailPassword.init(),
                Passwordless.init({
                    contactMethod: "EMAIL_OR_PHONE",
                }),
            ],
        });

        setMockResolvesSession({
            userId: "mock-user-id",
            accessTokenPayload: {},
            invalidClaims: [],
            doesSessionExist: false,
            loading: false,
        });
    });

    test("redirect if session exists", async () => {
        // when
        setMockResolvesSession({
            userId: "mock-user-id",
            accessTokenPayload: {},
            invalidClaims: [],
            doesSessionExist: true,
            loading: false,
        });
        render(<AuthPage preBuiltUIList={[ThirdPartyPreBuiltUI, PasswordlessPreBuiltUI, EmailPasswordPreBuiltUI]} />);

        // then
        await waitFor(() => {
            expect(MockSession.validateGlobalClaimsAndHandleSuccessRedirection).toHaveBeenCalledTimes(1);
            expect(MockSession.validateGlobalClaimsAndHandleSuccessRedirection).toHaveBeenCalledWith(
                undefined,
                "session",
                undefined,
                {},
                undefined
            );
        });
    });

    test("not redirect if session exists but redirectOnSessionExists=false", async () => {
        // when
        setMockResolvesSession({
            userId: "mock-user-id",
            accessTokenPayload: {},
            invalidClaims: [],
            doesSessionExist: true,
            loading: false,
        });
        const result = render(
            <AuthPage preBuiltUIList={[ThirdPartyPreBuiltUI]} factors={["thirdparty"]} redirectOnSessionExists={false}>
                mockRenderedText
            </AuthPage>
        );

        expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();
        // then
        await waitFor(() => {
            expect(MockSession.validateGlobalClaimsAndHandleSuccessRedirection).toHaveBeenCalledTimes(0);
        });
    });

    test("throw if factors is set to an empty array", async () => {
        let caught: Error | undefined;
        try {
            render(<AuthPage preBuiltUIList={[ThirdPartyPreBuiltUI]} factors={[]} />);
        } catch (ex: any) {
            caught = ex;
        }

        assert.ok(caught);
        assert.strictEqual(caught.message, "The factors array cannot be empty");
    });

    test("throw if not all prebuilt uis are present without a factorlist defined", async () => {
        let caught: Error | undefined;
        try {
            await act(async () => render(<AuthPage preBuiltUIList={[ThirdPartyPreBuiltUI]} />).debug());
        } catch (ex: any) {
            caught = ex;
        }

        assert.ok(caught);
        assert.strictEqual(
            caught.message,
            "Factor list not set but PreBuiltUI not added for emailpassword,passwordless"
        );
    });

    test("not throw if not all prebuilt uis are present with a matching factorlist defined", async () => {
        // when
        const result = render(
            <AuthPage preBuiltUIList={[ThirdPartyPreBuiltUI]} factors={["thirdparty"]}>
                mockRenderedText
            </AuthPage>
        );

        expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();
        // then
        await waitFor(() => {
            expect(MockSession.validateGlobalClaimsAndHandleSuccessRedirection).toHaveBeenCalledTimes(0);
        });
    });
});
