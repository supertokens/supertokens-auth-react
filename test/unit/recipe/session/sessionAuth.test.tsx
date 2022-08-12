import React, { useContext } from "react";
import "@testing-library/jest-dom";
import { act, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import SuperTokens from "../../../../lib/ts/superTokens";
import Session from "../../../../lib/ts/recipe/session/recipe";
import SessionAuth from "../../../../lib/ts/recipe/session/sessionAuth";
import SessionContext from "../../../../lib/ts/recipe/session/sessionContext";
import { SessionContextType } from "../../../../lib/ts/recipe/session";
import { PrimitiveClaim, SessionClaim, useClaimValue } from "../../../../lib/ts/recipe/session";

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
    const { value: claimValue } = useClaimValue(TestClaim);
    if (session.loading === true) {
        return <h1>Loading</h1>;
    }

    if (!session.doesSessionExist) {
        return <h1>Session doesn't exist</h1>;
    }

    return (
        <>
            <span>userId: {session.userId}</span>
            <span>accessTokenPayload: {JSON.stringify(session.accessTokenPayload)}</span>
            <span>invalidClaims: {session.invalidClaims.map((a) => a.validatorId).join(", ")}</span>
            <span>testClaimValue: {claimValue === undefined ? "undefined" : claimValue}</span>
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

jest.spyOn(SuperTokens, "getInstanceOrThrow").mockImplementation(
    () =>
        ({
            redirectToAuth: jest.fn(),
        } as any)
);
jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

describe("SessionAuth2", () => {
    beforeEach(() => {
        jest.clearAllMocks();

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
        // This should be called twice with react 18 strict mode
        await waitFor(() => expect(MockSession.addEventListener).toHaveBeenCalledTimes(2));
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
            let listenerFn: (event: any) => void;
            MockSession.addEventListener.mockImplementation((fn) => {
                listenerFn = fn;
            });

            // when
            const result = render(
                <SessionAuth requireAuth={false} onSessionExpired={mockOnSessionExpired}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            // Wait for full rendering
            expect(await result.findByText(/^userId:/)).toBeInTheDocument();

            await act(() =>
                listenerFn({
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
            let listenerFn: (event: any) => void;
            MockSession.addEventListener.mockImplementation((fn) => {
                listenerFn = fn;
            });

            // when
            const result = render(
                <SessionAuth requireAuth={false}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            // Wait for full rendering
            expect(await result.findByText(/^userId:/)).toBeInTheDocument();

            await act(() =>
                listenerFn({
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
            let listenerFn: (event: any) => void;
            MockSession.addEventListener.mockImplementation((fn) => {
                listenerFn = fn;
            });

            // when
            const result = render(
                <SessionAuth>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            expect(await result.findByText(/^userId:/)).toHaveTextContent(`userId: mock-user-id`);

            await act(() =>
                listenerFn({
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
            let listenerFn: (event: any) => void;
            MockSession.addEventListener.mockImplementationOnce((fn) => {
                listenerFn = fn;

                return () => {};
            });

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

            // when
            await act(() =>
                listenerFn({
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
        let listenerFn: (event: any) => void;
        MockSession.addEventListener.mockImplementationOnce((fn) => {
            listenerFn = fn;

            return () => {};
        });

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

        // when
        await act(() =>
            listenerFn({
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
});
