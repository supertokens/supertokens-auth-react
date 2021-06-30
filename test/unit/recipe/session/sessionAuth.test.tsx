import React, { useContext } from "react";
import "@testing-library/jest-dom";
import { act, render } from "@testing-library/react";
import Session from "../../../../lib/ts/recipe/session/recipe";
import SessionAuth from "../../../../lib/ts/recipe/session/sessionAuth";
import SessionContext from "../../../../lib/ts/recipe/session/SessionContext";
import { SessionContextType } from "../../../../lib/ts/recipe/session";

const MockSession = {
    addEventListener: jest.fn(),
    getUserId: jest.fn().mockResolvedValue("mock-user-id"),
    getJWTPayloadSecurely: jest.fn().mockResolvedValue({}),
    doesSessionExist: jest.fn().mockResolvedValue(true),
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
    MockSession.getUserId.mockResolvedValueOnce(ctx.userId);
    MockSession.getJWTPayloadSecurely.mockResolvedValueOnce(ctx.jwtPayload);
    MockSession.doesSessionExist.mockResolvedValueOnce(ctx.doesSessionExist);
};

jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

describe("SessionAuth", () => {
    beforeEach(() => {
        jest.clearAllMocks();
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

    describe("handle events", () => {
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

        test("call onSessionExpired on UNAUTHORISED", () => {
            // given
            const mockOnSessionExpired = jest.fn();

            MockSession.addEventListener.mockImplementationOnce((fn) => fn({ action: "UNAUTHORISED" }));

            // when
            const result = render(<SessionAuth onSessionExpired={mockOnSessionExpired} />);

            // then
            expect(mockOnSessionExpired).toHaveBeenCalled();
        });

        test("update context on SESSION_REFRESH", async () => {
            // given
            let listenerFn: (event: any) => void;
            MockSession.addEventListener.mockImplementationOnce((fn) => (listenerFn = fn));

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
});
