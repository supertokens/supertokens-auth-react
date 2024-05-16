import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import SuperTokens from "../../../../lib/ts/superTokens";
import Session from "../../../../lib/ts/recipe/session/recipe";
import Recipe from "../../../../lib/ts/recipe/emailpassword/recipe";
import { AuthPage } from "../../../../lib/ts/ui/index";
import { EmailPasswordPreBuiltUI } from "../../../../lib/ts/recipe/emailpassword/prebuiltui";
import { SessionContextType } from "../../../../lib/ts/recipe/session";

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

describe("EmailPassword.SignInAndUp", () => {
    const websiteDomain = "http://localhost:3000";
    beforeEach(() => {
        jest.clearAllMocks();
        Recipe.reset();
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
            recipeList: [Recipe.init()],
        });

        setMockResolvesSession({
            userId: "mock-user-id",
            accessTokenPayload: {},
            invalidClaims: [],
            doesSessionExist: true,
            loading: false,
        });
    });

    test("redirect if session exists", async () => {
        // when
        render(<AuthPage preBuiltUIList={[EmailPasswordPreBuiltUI]} />);
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
        const result = render(
            <AuthPage preBuiltUIList={[EmailPasswordPreBuiltUI]} redirectOnSessionExists={false}>
                {" "}
                mockRenderedText{" "}
            </AuthPage>
        );

        expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();
        // then
        await waitFor(() => {
            expect(MockSession.validateGlobalClaimsAndHandleSuccessRedirection).toHaveBeenCalledTimes(0);
        });
    });
});
