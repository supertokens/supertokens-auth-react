import React, { useContext } from "react";
import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Session from "../../../../lib/ts/recipe/session/recipe";
import SessionAuth from "../../../../lib/ts/recipe/session/sessionAuth";
import SessionContext from "../../../../lib/ts/recipe/session/sessionContext";
import { SessionContextType } from "../../../../lib/ts/recipe/session";

const MockSession = {
    addEventListener: jest.fn(),
    getUserId: jest.fn(),
    getJWTPayloadSecurely: jest.fn(),
    doesSessionExist: jest.fn(),
};

const MockSessionConsumer = () => {
    const session = useContext<SessionContextType>(SessionContext);

    if (!session.doesSessionExist) {
        return (
            <>
                <h1>Session doesn't exist</h1>
            </>
        );
    }

    return (
        <>
            <span>userId: {session.userId}</span>
            <span>jwtPayload: {JSON.stringify(session.jwtPayload)}</span>
        </>
    );
};

const setMockResolves = (ctx: SessionContextType) => {
    MockSession.getUserId.mockResolvedValue(ctx.userId);
    MockSession.getJWTPayloadSecurely.mockResolvedValue(ctx.jwtPayload);
    MockSession.doesSessionExist.mockResolvedValue(ctx.doesSessionExist);
};

jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

describe("SessionAuth", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        setMockResolves({
            userId: "mock-user-id",
            jwtPayload: {},
            doesSessionExist: true,
        });
    });

    test("setup event listener when no parent provider", () => {
        // when
        const result = render(<SessionAuth />);

        // then
        expect(MockSession.addEventListener).toHaveBeenCalledTimes(1);
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
        expect(await result.findByText(/^jwtPayload:/)).toHaveTextContent(`jwtPayload: ${JSON.stringify({})}`);
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
                    jwtPayload: {},
                    userId: "mock-id",
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
        test("call onSessionExpired on UNAUTHORISED", () => {
            // given
            const mockOnSessionExpired = jest.fn();

            MockSession.addEventListener.mockImplementationOnce((fn) => fn({ action: "UNAUTHORISED" }));

            // when
            const result = render(<SessionAuth onSessionExpired={mockOnSessionExpired} />);

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
                        jwtPayload: {
                            foo: "bar",
                        },
                    },
                })
            );

            // then
            expect(await result.findByText(/^userId:/)).toHaveTextContent(`userId: session-created-user-id`);
            expect(await result.findByText(/^jwtPayload:/)).toHaveTextContent(
                `jwtPayload: ${JSON.stringify({ foo: "bar" })}`
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

            expect(await result.findByText(/^jwtPayload:/)).toHaveTextContent(`jwtPayload: ${JSON.stringify({})}`);

            const mockJwtPayload = {
                afterRefreshKey: "afterRefreshValue",
            };

            // when
            act(() =>
                listenerFn({
                    action: "REFRESH_SESSION",
                    sessionContext: {
                        doesSessionExist: true,
                        userId: "mock-user-id",
                        jwtPayload: mockJwtPayload,
                    },
                })
            );

            expect(await result.findByText(/^jwtPayload:/)).toHaveTextContent(
                `jwtPayload: ${JSON.stringify(mockJwtPayload)}`
            );
        });
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
                jwtPayload: { foo: "bar" },
                userId: "before-id",
            });

            const result = render(
                <SessionAuth requireAuth={true} redirectToLogin={() => {}}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            const UserId = () => result.findByText(/^userId/);
            const JwtPayload = () => result.findByText(/^jwtPayload/);

            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);

            // when
            await act(() =>
                listenerFn({
                    action: "UNAUTHORISED",
                    sessionContext: {
                        doesSessionExist: false,
                        jwtPayload: { foo: "baz" },
                        userId: "after-id",
                    },
                })
            );

            // then
            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);
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
            MockSession.getJWTPayloadSecurely.mockResolvedValue({
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
            const JwtPayload = () => result.findByText(/^jwtPayload/);

            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);

            // when
            await act(() =>
                listenerFn({
                    action: "UNAUTHORISED",
                    sessionContext: {
                        doesSessionExist: false,
                        jwtPayload: {},
                        userId: "",
                    },
                })
            );

            // then
            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);
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
            MockSession.getJWTPayloadSecurely.mockResolvedValue({
                foo: "bar",
            });

            const result = render(
                <SessionAuth requireAuth={true} redirectToLogin={() => {}}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            const UserId = () => result.findByText(/^userId/);
            const JwtPayload = () => result.findByText(/^jwtPayload/);

            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);

            // when
            await act(() =>
                listenerFn({
                    action: "SIGN_OUT",
                    sessionContext: {
                        doesSessionExist: false,
                        jwtPayload: {},
                        userId: "",
                    },
                })
            );

            // then
            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);
        });
    });
});
