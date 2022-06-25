import React, { useContext } from "react";
import "@testing-library/jest-dom";
import { act, render, waitFor } from "@testing-library/react";
import Session from "../../../../lib/ts/recipe/session/recipe";
import SessionAuth from "../../../../lib/ts/recipe/session/sessionAuth";
import SessionContext from "../../../../lib/ts/recipe/session/sessionContext";
import { SessionContextType } from "../../../../lib/ts/recipe/session";

const MockSession = {
    addEventListener: jest.fn(),
    getUserId: jest.fn(),
    getAccessTokenPayloadSecurely: jest.fn(),
    doesSessionExist: jest.fn(),
};

const MockSessionConsumer = () => {
    const session = useContext(SessionContext);

    if (session.loading === true || !session.doesSessionExist) {
        return (
            <>
                <h1>Session doesn't exist</h1>
            </>
        );
    }

    return (
        <>
            <span>userId: {session.userId}</span>
            <span>accessTokenPayload: {JSON.stringify(session.accessTokenPayload)}</span>
        </>
    );
};

const setMockResolves = (ctx: SessionContextType) => {
    if (ctx.loading === true) {
        throw new Error();
    }
    MockSession.getUserId.mockResolvedValue(ctx.userId);
    MockSession.getAccessTokenPayloadSecurely.mockResolvedValue(ctx.accessTokenPayload);
    MockSession.doesSessionExist.mockResolvedValue(ctx.doesSessionExist);
};

jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

describe("SessionAuth", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        setMockResolves({
            userId: "mock-user-id",
            accessTokenPayload: {},
            doesSessionExist: true,
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
                shouldRender: true,
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
                    loading: false,
                });

                // when
                const result = render(
                    // We're passing redirectToLogin just to make sure it doesn't throw when requireAuth=true
                    <SessionAuth requireAuth={requireAuth as any} redirectToLogin={noop}>
                        <h1>Children</h1>
                    </SessionAuth>
                );

                const child = await result.findByText(/Children/i).catch(() => null);

                // then
                if (shouldRender) {
                    expect(child).toBeInTheDocument();
                } else {
                    expect(child).not.toBeInTheDocument();
                }
            });
        });
    });

    describe("handle events", () => {
        test("call onSessionExpired on UNAUTHORISED", async () => {
            // given
            const mockOnSessionExpired = jest.fn();

            MockSession.addEventListener.mockImplementationOnce((fn) => fn({ action: "UNAUTHORISED" }));

            // when
            const result = render(<SessionAuth onSessionExpired={mockOnSessionExpired}>mockRenderedText</SessionAuth>);

            // Wait for full rendering
            expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();

            // then
            expect(mockOnSessionExpired).toHaveBeenCalledTimes(1);
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

            act(() =>
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
            act(() =>
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

        const mockAccessTokenPayload = {
            afterRefreshKey: "afterRefreshValue",
        };

        // when
        act(() =>
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
    });

    describe("onSessionExpired", () => {
        test("not update context when prop is passed", async () => {
            // given
            const mockOnSessionExpired = jest.fn();
            let listenerFn: (event: any) => void;

            MockSession.addEventListener.mockImplementationOnce((listener) => {
                listenerFn = listener;

                return () => {};
            });

            setMockResolves({
                doesSessionExist: true,
                accessTokenPayload: { foo: "bar" },
                userId: "before-id",
                loading: false,
            });

            const result = render(
                <SessionAuth requireAuth={true} redirectToLogin={() => {}}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            const UserId = () => result.findByText(/^userId/);
            const AccessTokenPayload = () => result.findByText(/^accessTokenPayload/);

            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await AccessTokenPayload()).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify({ foo: "bar" })}`
            );

            // when
            await act(() =>
                listenerFn({
                    action: "UNAUTHORISED",
                    sessionContext: {
                        doesSessionExist: false,
                        accessTokenPayload: { foo: "baz" },
                        userId: "after-id",
                    },
                })
            );

            // then
            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await AccessTokenPayload()).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify({ foo: "bar" })}`
            );
        });

        test("not update context when prop is passed in parent SessionAuth", async () => {
            // given
            const mockOnSessionExpired = jest.fn();
            let listenerFn: (event: any) => void;

            MockSession.addEventListener.mockImplementation((fn) => {
                listenerFn = fn;

                return () => {};
            });

            MockSession.doesSessionExist.mockResolvedValue(true);
            MockSession.getUserId.mockResolvedValue("before-id");
            MockSession.getAccessTokenPayloadSecurely.mockResolvedValue({
                foo: "bar",
            });

            const result = render(
                <SessionAuth onSessionExpired={mockOnSessionExpired}>
                    <SessionAuth requireAuth={true} redirectToLogin={() => {}}>
                        <MockSessionConsumer />
                    </SessionAuth>
                </SessionAuth>
            );

            const UserId = () => result.findByText(/^userId/);
            const AccessTokenPayload = () => result.findByText(/^accessTokenPayload/);

            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await AccessTokenPayload()).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify({ foo: "bar" })}`
            );

            // when
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
            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await AccessTokenPayload()).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify({ foo: "bar" })}`
            );
        });
    });

    describe("onSignOut", () => {
        test("not update context when sign out event is fired and requireAuth is true", async () => {
            // given
            const mockOnSessionExpired = jest.fn();
            let listenerFn: (event: any) => void;

            MockSession.addEventListener.mockImplementation((fn) => {
                listenerFn = fn;

                return () => {};
            });

            MockSession.doesSessionExist.mockResolvedValue(true);
            MockSession.getUserId.mockResolvedValue("before-id");
            MockSession.getAccessTokenPayloadSecurely.mockResolvedValue({
                foo: "bar",
            });

            const result = render(
                <SessionAuth requireAuth={true} redirectToLogin={() => {}}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            const UserId = () => result.findByText(/^userId/);
            const AccessTokenPayload = () => result.findByText(/^accessTokenPayload/);

            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await AccessTokenPayload()).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify({ foo: "bar" })}`
            );

            // when
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

            // then
            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await AccessTokenPayload()).toHaveTextContent(
                `accessTokenPayload: ${JSON.stringify({ foo: "bar" })}`
            );
        });
    });
});
