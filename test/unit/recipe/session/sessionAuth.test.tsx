import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
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

const setMockResolves = (ctx: SessionContextType) => {
    MockSession.getUserId.mockResolvedValueOnce(ctx.userId);
    MockSession.getJWTPayloadSecurely.mockResolvedValueOnce(ctx.jwtPayload);
    MockSession.doesSessionExist.mockResolvedValueOnce(ctx.doesSessionExist);
};

jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

// This test will generate warnings about updates without act(...)
//
describe("SessionAuth", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("setup event listener when no parent provider", () => {
        // when
        const result = render(<SessionAuth redirectToLogin={() => {}} />);

        // then
        expect(MockSession.addEventListener).toHaveBeenCalledTimes(1);
    });

    test("unsubscribe event listener on unmount", async () => {
        // given
        const mockUnsubscribe = jest.fn();
        MockSession.addEventListener.mockImplementationOnce(() => mockUnsubscribe);

        // when
        const result = render(<SessionAuth redirectToLogin={() => {}}>mockRenderedText</SessionAuth>);

        expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();

        result.unmount();

        // then
        expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });

    test("set initial context", async () => {
        // given
        const MockChild = jest.fn(() => "waitForMe");
        setMockResolves({
            doesSessionExist: true,
            userId: "initial-user-id",
            jwtPayload: {
                testKey: "testValue",
            },
        });

        // when
        const result = render(
            <SessionAuth redirectToLogin={() => {}}>
                <SessionContext.Consumer>{MockChild}</SessionContext.Consumer>
            </SessionAuth>
        );

        expect(await result.findByText("waitForMe")).toBeInTheDocument();

        // then
        expect(MockChild).toHaveBeenCalledWith({
            doesSessionExist: true,
            userId: "initial-user-id",
            jwtPayload: {
                testKey: "testValue",
            },
        });
    });

    describe("handle events", () => {
        const MockChild = jest.fn(() => "waitForMe");

        test("update context on SESSION_CREATED", async () => {
            // given
            MockSession.addEventListener.mockImplementationOnce((fn) => fn({ action: "SESSION_CREATED" }));

            // when
            const result = render(
                <SessionAuth redirectToLogin={() => {}}>
                    <SessionContext.Consumer>{MockChild}</SessionContext.Consumer>
                </SessionAuth>
            );

            expect(await result.findByText("waitForMe")).toBeInTheDocument();

            // then
            expect(MockChild).toHaveBeenCalledWith({
                doesSessionExist: true,
                jwtPayload: {},
                userId: "mock-user-id",
            });
        });

        test.todo("update context on SESSION_REFRESH");
        test.todo("update context on SIGN_OUT");
        test.todo("don't update context on UNAUTHORISED and call onSessionExpired");
    });
});
