import React, { useContext, useState } from "react";
import "@testing-library/jest-dom";
import { act, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import SuperTokens from "../../../../lib/ts/superTokens";
import Session from "../../../../lib/ts/recipe/session/recipe";
import SessionAuth from "../../../../lib/ts/recipe/session/sessionAuth";
import SessionContext from "../../../../lib/ts/recipe/session/sessionContext";
import { SessionContextType } from "../../../../lib/ts/recipe/session";
import { PrimitiveClaim, SessionClaim, useClaimValue } from "../../../../lib/ts/recipe/session";
import * as utils from "supertokens-web-js/utils";
import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

const TestClaim: SessionClaim<string> = new PrimitiveClaim({
    id: "st-test-claim",
    refresh: async () => {},
});

const MockSession = {
    addEventListener: jest.fn(),
    getUserId: jest.fn(),
    getAccessTokenPayloadSecurely: jest.fn(),
    doesSessionExist: jest.fn(),
    validateClaims: jest.fn(),
};

const MockSessionConsumer = () => {
    const session = useContext(SessionContext);
    const claimValueCtx = useClaimValue(TestClaim);

    expect(session.loading).toEqual(claimValueCtx.loading);

    if (session.loading === true || claimValueCtx.loading === true) {
        return <h1>Loading</h1>;
    }

    expect(session.doesSessionExist).toEqual(claimValueCtx.doesSessionExist);

    if (!session.doesSessionExist) {
        return <h1>Session doesn't exist</h1>;
    }

    return (
        <>
            <span>userId: {session.userId}</span>
            <span>accessTokenPayload: {JSON.stringify(session.accessTokenPayload)}</span>
            <span>invalidClaims: {session.invalidClaims.map((a) => a.id).join(", ")}</span>
            <span>testClaimValue: {claimValueCtx.value === undefined ? "undefined" : claimValueCtx.value}</span>
        </>
    );
};

const setMockResolves = (ctx: SessionContextType) => {
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

let mockRedirectToAuth: jest.Mock<Promise<void>, Parameters<SuperTokens["redirectToAuth"]>>;
let mockRedirectToUrl: jest.Mock<Promise<void>, Parameters<SuperTokens["redirectToUrl"]>>;

jest.spyOn(SuperTokens, "getInstanceOrThrow").mockImplementation(
    () =>
        ({
            redirectToAuth: (mockRedirectToAuth = jest.fn()),
            redirectToUrl: (mockRedirectToUrl = jest.fn()),
            appInfo: {
                websiteDomain: { getAsStringDangerous: () => "http://localhost:3000" },
                apiDomain: { getAsStringDangerous: () => "http://localhost:3001" },
            },
        } as any)
);
jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

jest.spyOn(utils, "getGlobalClaimValidators").mockReturnValue([
    { id: "st-test-claim", onFailureRedirection: () => "/test-redirect" },
] as any[]);

describe("SessionAuth", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        SuperTokens.reset();
        WindowHandlerReference.init();

        setMockResolves({
            userId: "mock-user-id",
            accessTokenPayload: {},
            doesSessionExist: true,
            invalidClaims: [],
            loading: false,
        });
    });

    test("setup event listener when no parent provider", async () => {
        // when
        const result = render(<SessionAuth />);

        // then
        await waitFor(() => expect(MockSession.addEventListener).toHaveBeenCalledTimes(1));
    });

    test("unsubscribe event listener on unmount", async () => {
        // given
        const mockUnsubscribe = jest.fn();
        MockSession.addEventListener.mockImplementationOnce(() => mockUnsubscribe);

        // when
        const result = render(<SessionAuth>mockRenderedText</SessionAuth>);

        expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();

        result.unmount();

        // then
        expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });

    test("adding in a component outside of router", async () => {
        let reactRouterDom: any = undefined;
        const MockSuperTokens = {
            getReactRouterDomWithCustomHistory: () => {
                return reactRouterDom;
            },
        };

        (SuperTokens as any).instance = MockSuperTokens;

        // given
        function SubComponentWithRoutes() {
            reactRouterDom = {
                useHistoryCustom: () => {
                    const [val, set] = useState("");
                    return set;
                },
            };
            return <>mockRenderedText</>;
        }

        // when
        const result = render(
            <SessionAuth>
                <SubComponentWithRoutes />
            </SessionAuth>
        );
        expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();
        result.rerender(
            <SessionAuth>
                <SubComponentWithRoutes />
            </SessionAuth>
        );

        expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();

        result.unmount();
    });
    test("set initial context", async () => {
        // when
        const result = render(
            <SessionAuth>
                <MockSessionConsumer />
            </SessionAuth>
        );

        // then
        expect(await result.findByText(/^userId:/)).toHaveTextContent(`userId: mock-user-id`);
        expect(await result.findByText(/^accessTokenPayload:/)).toHaveTextContent(
            `accessTokenPayload: ${JSON.stringify({})}`
        );
    });

    describe("children rendering", () => {
        const testCases = [
            {
                requireAuth: false,
                doesSessionExist: false,
                shouldRender: true,
            },
            {
                requireAuth: undefined,
                doesSessionExist: false,
                shouldRender: false,
            },
            {
                requireAuth: true,
                doesSessionExist: false,
                shouldRender: false,
            },
            {
                requireAuth: false,
                doesSessionExist: true,
                shouldRender: true,
            },
            {
                requireAuth: undefined,
                doesSessionExist: true,
                shouldRender: true,
            },
            {
                requireAuth: true,
                doesSessionExist: true,
                shouldRender: true,
            },
        ];

        testCases.forEach(({ doesSessionExist, requireAuth, shouldRender }) => {
            test(`${shouldRender ? "do" : "don't"} render when requireAuth=${requireAuth} and session ${
                doesSessionExist ? "exists" : "doesn't exist"
            }`, async () => {
                // given
                const noop = jest.fn();
                setMockResolves({
                    doesSessionExist,
                    accessTokenPayload: {},
                    userId: "mock-id",
                    invalidClaims: [],
                    loading: false,
                });

                // when
                const result = render(
                    <SessionAuth requireAuth={requireAuth as any}>
                        <MockSessionConsumer />
                    </SessionAuth>
                );

                if (requireAuth === false) {
                    await waitForElementToBeRemoved(() => result.queryByText("Loading"));
                }

                const child = await result
                    .findByText(doesSessionExist ? /userId:/i : "Session doesn't exist")
                    .catch(() => null);

                // then
                if (shouldRender) {
                    expect(child).toBeInTheDocument();
                } else {
                    expect(child).not.toBeInTheDocument();
                }
            });
        });

        test("don't render when requireAuth=true and session is loading", async () => {
            // given
            const noop = jest.fn();
            setMockResolves({
                loading: true,
            });

            // when
            const result = render(
                <SessionAuth requireAuth={true}>
                    <h1>Children</h1>
                </SessionAuth>
            );

            const child = await result.findByText(/Children/i).catch(() => null);

            // then
            expect(child).not.toBeInTheDocument();
        });

        test("do render when requireAuth=false and session is loading", async () => {
            // given
            setMockResolves({
                loading: true,
            });

            // when
            const result = render(
                <SessionAuth requireAuth={false}>
                    <h1>Children</h1>
                </SessionAuth>
            );

            const child = await result.findByText(/Children/i).catch(() => null);

            // then
            expect(child).toBeInTheDocument();
        });
    });

    describe("handle events", () => {
        test("call onSessionExpired on UNAUTHORISED", async () => {
            // given
            const mockOnSessionExpired = jest.fn();
            const listenerAdded = useMockEventListener();

            // when
            const result = render(
                <SessionAuth requireAuth={false} onSessionExpired={mockOnSessionExpired}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            // Wait for full rendering
            expect(await result.findByText(/^userId:/)).toBeInTheDocument();

            const listenerFn = await listenerAdded;
            await act(() =>
                listenerFn!({
                    action: "UNAUTHORISED",
                    sessionContext: {
                        doesSessionExist: false,
                        accessTokenPayload: {},
                        userId: "",
                    },
                })
            );

            // then
            expect(mockOnSessionExpired).toHaveBeenCalledTimes(1);

            await result.findByText("Session doesn't exist");
        });

        test("update context on SIGN_OUT", async () => {
            // given
            const listenerAdded = useMockEventListener();

            // when
            const result = render(
                <SessionAuth requireAuth={false}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            // Wait for full rendering
            expect(await result.findByText(/^userId:/)).toBeInTheDocument();

            const listenerFn = await listenerAdded;
            await act(() =>
                listenerFn!({
                    action: "SIGN_OUT",
                    sessionContext: {
                        doesSessionExist: false,
                        accessTokenPayload: {},
                        userId: "",
                    },
                })
            );

            await result.findByText("Session doesn't exist");
        });

        test("update context on SESSION_CREATED", async () => {
            // given
            const listenerAdded = useMockEventListener();

            // when
            const result = render(
                <SessionAuth>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            expect(await result.findByText(/^userId:/)).toHaveTextContent(`userId: mock-user-id`);

            const listenerFn = await listenerAdded;
            await act(() =>
                listenerFn!({
                    action: "SESSION_CREATED",
                    sessionContext: {
                        doesSessionExist: true,
                        userId: "session-created-user-id",
                        accessTokenPayload: {
                            foo: "bar",
                        },
                    },
                })
            );

            // then
            expect(await result.findByText(/^userId:/)).toHaveTextContent(`userId: session-created-user-id`);
            expect(await result.findByText(/^accessTokenPayload:/)).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify({ foo: "bar" })}`
            );
        });

        test("update context on SESSION_REFRESH", async () => {
            // given
            const listenerAdded = useMockEventListener();

            const result = render(
                <SessionAuth>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            expect(await result.findByText(/^accessTokenPayload:/)).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify({})}`
            );

            const mockAccessTokenPayload = {
                afterRefreshKey: "afterRefreshValue",
            };

            const listenerFn = await listenerAdded;
            // when
            await act(() =>
                listenerFn!({
                    action: "REFRESH_SESSION",
                    sessionContext: {
                        doesSessionExist: true,
                        userId: "mock-user-id",
                        accessTokenPayload: mockAccessTokenPayload,
                    },
                })
            );

            expect(await result.findByText(/^accessTokenPayload:/)).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify(mockAccessTokenPayload)}`
            );
        });
    });

    test("update context on ACCESS_TOKEN_PAYLOAD_UPDATED", async () => {
        // given
        const listenerAdded = useMockEventListener();

        const result = render(
            <SessionAuth>
                <MockSessionConsumer />
            </SessionAuth>
        );

        expect(await result.findByText(/^accessTokenPayload:/)).toHaveTextContent(
            `accessTokenPayload: ${JSON.stringify({})}`
        );

        expect(await result.findByText(/^testClaimValue:/)).toHaveTextContent(`testClaimValue: undefined`);

        const mockAccessTokenPayload = {
            afterRefreshKey: "afterRefreshValue",
            "st-test-claim": {
                v: "test!",
                t: Date.now(),
            },
        };

        const listenerFn = await listenerAdded;
        // when
        await act(() =>
            listenerFn!({
                action: "ACCESS_TOKEN_PAYLOAD_UPDATED",
                sessionContext: {
                    doesSessionExist: true,
                    userId: "mock-user-id",
                    accessTokenPayload: mockAccessTokenPayload,
                },
            })
        );
        // then
        expect(await result.findByText(/^accessTokenPayload:/)).toHaveTextContent(
            `accessTokenPayload: ${JSON.stringify(mockAccessTokenPayload)}`
        );
        expect(await result.findByText(/^testClaimValue:/)).toHaveTextContent(`testClaimValue: test!`);
    });

    describe("redirections", () => {
        test("redirect on ACCESS_TOKEN_PAYLOAD_UPDATED for invalid claim", async () => {
            // given
            const listenerAdded = useMockEventListener();

            const result = render(
                <SessionAuth>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            const accessTokenPayloadElement = await result.findByText(/^accessTokenPayload:/);
            expect(accessTokenPayloadElement).toHaveTextContent(`accessTokenPayload: ${JSON.stringify({})}`);

            expect(await result.findByText(/^testClaimValue:/)).toHaveTextContent(`testClaimValue: undefined`);

            const mockAccessTokenPayload = {
                afterRefreshKey: "afterRefreshValue",
                "st-test-claim": {
                    v: "test!",
                    t: Date.now(),
                },
            };

            setMockResolves({
                doesSessionExist: true,
                accessTokenPayload: {},
                userId: "mock-id",
                invalidClaims: [{ id: "st-test-claim", reason: "test-reason" }],
                loading: false,
            });

            const listenerFn = await listenerAdded;
            await act(() =>
                listenerFn!({
                    action: "ACCESS_TOKEN_PAYLOAD_UPDATED",
                    sessionContext: {
                        doesSessionExist: true,
                        accessTokenPayload: mockAccessTokenPayload,
                        userId: "",
                    },
                })
            );

            // then
            // it shouldn't update the context
            expect(accessTokenPayloadElement).toHaveTextContent(`accessTokenPayload: ${JSON.stringify({})}`);

            // and call redirect
            expect(mockRedirectToUrl).toHaveBeenLastCalledWith("/test-redirect", undefined);
        });

        test("not redirect on ACCESS_TOKEN_PAYLOAD_UPDATED for invalid claim if doRedirection=false", async () => {
            // given
            const listenerAdded = useMockEventListener();

            const result = render(
                <SessionAuth doRedirection={false}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            const accessTokenPayloadElement = await result.findByText(/^accessTokenPayload:/);
            expect(accessTokenPayloadElement).toHaveTextContent(`accessTokenPayload: ${JSON.stringify({})}`);

            expect(await result.findByText(/^testClaimValue:/)).toHaveTextContent(`testClaimValue: undefined`);

            const mockAccessTokenPayload = {
                afterRefreshKey: "afterRefreshValue",
                "st-test-claim": {
                    v: "test!",
                    t: Date.now(),
                },
            };

            const listenerFn = await listenerAdded;
            await act(() =>
                listenerFn!({
                    action: "ACCESS_TOKEN_PAYLOAD_UPDATED",
                    sessionContext: {
                        doesSessionExist: true,
                        accessTokenPayload: mockAccessTokenPayload,
                        userId: "",
                    },
                })
            );

            // then
            expect(await result.findByText(/^accessTokenPayload:/)).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify(mockAccessTokenPayload)}`
            );

            expect(mockRedirectToUrl).toHaveBeenCalledTimes(0);
        });

        test("redirect on UNAUTHORISED", async () => {
            // given
            const listenerAdded = useMockEventListener();

            const result = render(
                <SessionAuth>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            const accessTokenPayloadElement = await result.findByText(/^accessTokenPayload:/);
            expect(accessTokenPayloadElement).toHaveTextContent(`accessTokenPayload: ${JSON.stringify({})}`);

            expect(await result.findByText(/^testClaimValue:/)).toHaveTextContent(`testClaimValue: undefined`);

            const listenerFn = await listenerAdded;
            await Promise.all([
                act(() =>
                    listenerFn!({
                        action: "UNAUTHORISED",
                        sessionContext: {
                            doesSessionExist: false,
                            accessTokenPayload: {},
                            userId: "",
                        },
                    })
                ),
                waitForElementToBeRemoved(accessTokenPayloadElement),
            ]);

            // then
            expect(mockRedirectToAuth).toHaveBeenLastCalledWith({
                redirectBack: true,
                navigate: undefined,
                userContext: {},
            });
        });

        test("not redirect on UNAUTHORISED if doRedirection=false", async () => {
            // given
            const listenerAdded = useMockEventListener();

            const result = render(
                <SessionAuth doRedirection={false}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            const accessTokenPayloadElement = await result.findByText(/^accessTokenPayload:/);
            expect(accessTokenPayloadElement).toHaveTextContent(`accessTokenPayload: ${JSON.stringify({})}`);

            expect(await result.findByText(/^testClaimValue:/)).toHaveTextContent(`testClaimValue: undefined`);

            const listenerFn = await listenerAdded;
            await Promise.all([
                act(() =>
                    listenerFn!({
                        action: "UNAUTHORISED",
                        sessionContext: {
                            doesSessionExist: false,
                            accessTokenPayload: {},
                            userId: "",
                        },
                    })
                ),
                waitForElementToBeRemoved(accessTokenPayloadElement),
            ]);

            // then
            expect(mockRedirectToUrl).toHaveBeenCalledTimes(0);
        });

        test("not redirect on session load if doRedirection=false", async () => {
            // given
            setMockResolves({
                doesSessionExist: false,
                accessTokenPayload: {},
                userId: "",
                invalidClaims: [],
                loading: false,
            });

            // when
            const result = render(
                <SessionAuth requireAuth={true}>
                    <h1>Children</h1>
                </SessionAuth>
            );

            const child = await result.findByText(/Children/i).catch(() => null);

            // then
            expect(child).not.toBeInTheDocument();
            expect(mockRedirectToAuth).toHaveBeenLastCalledWith({
                redirectBack: true,
                navigate: undefined,
                userContext: {},
            });
        });

        test("not redirect on session load if doRedirection=false", async () => {
            // given
            setMockResolves({
                doesSessionExist: false,
                accessTokenPayload: {},
                userId: "",
                invalidClaims: [],
                loading: false,
            });

            // when
            const result = render(
                <SessionAuth requireAuth={true} doRedirection={false}>
                    <h1>Children</h1>
                </SessionAuth>
            );

            const child = await result.findByText(/Children/i).catch(() => null);

            // then
            expect(child).not.toBeInTheDocument();
            expect(mockRedirectToUrl).toHaveBeenCalledTimes(0);
        });
    });
});
function useMockEventListener(): Promise<(event: any) => void> {
    let setListenerAdded;
    const listenerAdded = new Promise<(event: any) => void>((res) => {
        setListenerAdded = res;
    });
    MockSession.addEventListener.mockImplementation((fn) => {
        setListenerAdded(fn);
    });
    return listenerAdded;
}
