import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import SuperTokens from "../../../../lib/ts/superTokens";
import Session from "../../../../lib/ts/recipe/session/recipe";
import Recipe from "../../../../lib/ts/recipe/passwordless/recipe";
import { SignInUp } from "../../../../lib/ts/recipe/passwordless";
import { SessionContextType } from "../../../../lib/ts/recipe/session";
import { WindowHandlerInterface } from "supertokens-website/utils/windowHandler/types";

const MockSession = {
    addEventListener: jest.fn(),
    getUserId: jest.fn(),
    getAccessTokenPayloadSecurely: jest.fn(),
    doesSessionExist: jest.fn(),
};

const setMockResolvesSession = (ctx: SessionContextType) => {
    if (ctx.loading === true) {
        // We "simulate" loading by returning these promises that won't ever resolve
        MockSession.getUserId.mockReturnValue(new Promise<any>(() => {}));
        MockSession.getAccessTokenPayloadSecurely.mockReturnValue(new Promise<any>(() => {}));
        MockSession.doesSessionExist.mockReturnValue(new Promise<any>(() => {}));
    } else {
        MockSession.getUserId.mockResolvedValue(ctx.userId);
        MockSession.getAccessTokenPayloadSecurely.mockResolvedValue(ctx.accessTokenPayload);
        MockSession.doesSessionExist.mockResolvedValue(ctx.doesSessionExist);
    }
};

jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

describe("Passwordless.SingInUp", () => {
    const websiteDomain = "http://localhost:3000";
    let myWindow: WindowHandlerInterface;
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
            recipeList: [
                Recipe.init({
                    contactMethod: "EMAIL_OR_PHONE",
                    useShadowDom: false,
                }),
            ],
            windowHandler: (orig) => {
                let url = new URL(websiteDomain + "/start");

                myWindow = {
                    ...orig,
                    location: {
                        assign: (val) => {
                            url = new URL(typeof val === "string" && val.startsWith("/") ? websiteDomain + val : val);
                        },
                        setHref: (val) => {
                            myWindow.location.assign(val);
                        },
                        getHash: () => url.hash,
                        getHostName: () => url.hostname,
                        getHref: () => url.href,
                        getOrigin: () => url.origin,
                        getPathName: () => url.pathname,
                        getSearch: () => url.search,
                    },
                };
                return myWindow;
            },
        });

        setMockResolvesSession({
            userId: "mock-user-id",
            accessTokenPayload: {},
            doesSessionExist: true,
            loading: false,
        });
    });

    test("redirect if session exists", async () => {
        const spy = jest.spyOn(myWindow.location, "setHref");
        // when
        render(<SignInUp />);
        // then
        await waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith("/");
        });
    });

    test("not redirect if session exists but redirectOnSessionExists=false", async () => {
        const spy = jest.spyOn(myWindow.location, "setHref");
        // when
        const result = render(<SignInUp redirectOnSessionExists={false}> mockRenderedText </SignInUp>);

        expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();
        // then
        await waitFor(() => {
            expect(spy).toHaveBeenCalledTimes(0);
        });
    });
});
