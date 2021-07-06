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
            expect(mockOnSessionExpired).toHaveBeenCalled();
        });

        test("update context on SESSION_CREATED", async () => {
            // given
            MockSession.addEventListener.mockImplementationOnce((fn) => fn({ action: "SESSION_CREATED" }));

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

        test("update context on SESSION_REFRESH", async () => {
            // given
            let listenerFn: (event: any) => void;
            MockSession.addEventListener.mockImplementationOnce((fn) => {
                listenerFn = fn;

                return () => {};
            });

            const result = render(
                <SessionAuth redirectToLogin={() => {}} requireAuth={true}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            expect(await result.findByText(/^jwtPayload:/)).toHaveTextContent(`jwtPayload: ${JSON.stringify({})}`);

            const mockJwtPayload = {
                afterRefreshKey: "afterRefreshValue",
            };

            MockSession.getJWTPayloadSecurely.mockResolvedValueOnce(mockJwtPayload);

            // when
            act(() => listenerFn({ action: "REFRESH_SESSION" }));

            expect(await result.findByText(/^jwtPayload:/)).toHaveTextContent(
                `jwtPayload: ${JSON.stringify(mockJwtPayload)}`
            );
        });

        test.todo("update context on SIGN_OUT");
    });

    describe("onSessionExpired", () => {
        beforeEach(() => {
            MockSession.doesSessionExist.mockReset();
            MockSession.getJWTPayloadSecurely.mockReset();
            MockSession.getUserId.mockReset();
        });

        test("not update context when prop is passed", async () => {
            // given
            const mockOnSessionExpired = jest.fn();
            let unauthorisedListener: (event: any) => void;

            MockSession.addEventListener.mockImplementationOnce((listener) => {
                unauthorisedListener = listener;

                return () => {};
            });

            setMockResolves({
                doesSessionExist: true,
                jwtPayload: { foo: "bar" },
                userId: "before-id",
            });

            const result = render(
                <SessionAuth onSessionExpired={mockOnSessionExpired}>
                    <MockSessionConsumer />
                </SessionAuth>
            );

            const UserId = () => result.findByText(/^userId/);
            const JwtPayload = () => result.findByText(/^jwtPayload/);

            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);

            setMockResolves({
                doesSessionExist: false,
                jwtPayload: { foo: "baz" },
                userId: "after-id",
            });

            // when
            await act(() => unauthorisedListener({ action: "UNAUTHORISED" }));

            // then
            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);
        });

        test("not update context when prop is passed in parent SessionAuth", async () => {
            // given
            const mockOnSessionExpired = jest.fn();
            let unauthorisedListener: () => void;

            MockSession.addEventListener.mockImplementation((fn) => {
                unauthorisedListener = () => fn({ action: "UNAUTHORISED" });

                return () => {};
            });

            MockSession.doesSessionExist.mockResolvedValue(true);
            MockSession.getUserId.mockResolvedValue("before-id");
            MockSession.getJWTPayloadSecurely.mockResolvedValue({
                foo: "bar",
            });

            const result = render(
                <SessionAuth onSessionExpired={mockOnSessionExpired}>
                    <SessionAuth>
                        <MockSessionConsumer />
                    </SessionAuth>
                </SessionAuth>
            );

            const UserId = () => result.findByText(/^userId/);
            const JwtPayload = () => result.findByText(/^jwtPayload/);

            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);

            MockSession.doesSessionExist.mockResolvedValue(false);
            MockSession.getUserId.mockResolvedValue("after-id");
            MockSession.getJWTPayloadSecurely.mockResolvedValue({
                foo: "baz",
            });

            // when
            await act(() => unauthorisedListener());

            // then
            expect(await UserId()).toHaveTextContent(`userId: before-id`);
            expect(await JwtPayload()).toHaveTextContent(`jwtPayload: ${JSON.stringify({ foo: "bar" })}`);
        });
    });
});
