import React, { useContext } from "react";
import "@testing-library/jest-dom";
import { render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import SuperTokens from "../../../../lib/ts/superTokens";
import Session from "../../../../lib/ts/recipe/session/recipe";
import EmailPasswordRecipe from "../../../../lib/ts/recipe/emailpassword/recipe";
import { EmailPasswordAuth } from "../../../../lib/ts/recipe/emailpassword";
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
        </>
    );
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

jest.spyOn(SuperTokens, "getInstanceOrThrow").mockImplementation(
    () =>
        ({
            getReactRouterDomWithCustomHistory: jest.fn(),
        } as any)
);
jest.spyOn(Session, "getInstanceOrThrow").mockImplementation(() => MockSession as any);

const emailVerificationConfig = {
    mode: "OFF",
};
const isEmailVerifiedMock = jest.fn();
const MockEmailPassword = {
    emailVerification: {
        config: emailVerificationConfig,
        isEmailVerified: isEmailVerifiedMock,
        redirect: jest.fn(),
    },
    redirectToAuthWithRedirectToPath: jest.fn(),
};
jest.spyOn(EmailPasswordRecipe, "getInstanceOrThrow").mockImplementation(() => MockEmailPassword as any);

describe("EmailPasswordAuth", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        setMockResolvesSession({
            userId: "mock-user-id",
            accessTokenPayload: {},
            doesSessionExist: true,
            loading: false,
        });

        emailVerificationConfig.mode = "OFF";
        isEmailVerifiedMock.mockReset();
    });

    test("setup event listener when no parent provider", async () => {
        // when
        const result = render(<EmailPasswordAuth />);

        // then
        // This should be called twice with react 18 strict mode
        await waitFor(() => expect(MockSession.addEventListener).toHaveBeenCalledTimes(2));
    });

    test("unsubscribe event listener on unmount", async () => {
        // given
        const mockUnsubscribe = jest.fn();
        MockSession.addEventListener.mockImplementationOnce(() => mockUnsubscribe);

        // when
        const result = render(<EmailPasswordAuth>mockRenderedText</EmailPasswordAuth>);

        expect(await result.findByText(`mockRenderedText`)).toBeInTheDocument();

        result.unmount();

        // then
        expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });

    test("set initial context", async () => {
        // when
        const result = render(
            <EmailPasswordAuth>
                <MockSessionConsumer />
            </EmailPasswordAuth>
        );

        // then
        expect(await result.findByText(/^userId:/)).toHaveTextContent(`userId: mock-user-id`);
        expect(await result.findByText(/^accessTokenPayload:/)).toHaveTextContent(
            `accessTokenPayload: ${JSON.stringify({})}`
        );
    });

    describe("children rendering", () => {
        const testCases = [
            // Even if email verification is required it should render if a session isn't required and doesn't exists
            {
                emailVerificationRequired: true,
                isEmailVerified: false,
                requireAuth: false,
                doesSessionExist: false,
                shouldRender: true,
            },

            // It should render only if email is verified if a session exists and verification is required
            {
                emailVerificationRequired: true,
                isEmailVerified: false,
                requireAuth: false,
                doesSessionExist: true,
                shouldRender: false,
            },
            {
                emailVerificationRequired: true,
                isEmailVerified: false,
                requireAuth: true,
                doesSessionExist: true,
                shouldRender: false,
            },
            {
                emailVerificationRequired: true,
                isEmailVerified: true,
                requireAuth: true,
                doesSessionExist: true,
                shouldRender: true,
            },

            // requireAuth should default to true
            {
                emailVerificationRequired: false,
                isEmailVerified: false,
                requireAuth: undefined,
                doesSessionExist: false,
                shouldRender: false,
            },
            {
                emailVerificationRequired: false,
                isEmailVerified: false,
                requireAuth: undefined,
                doesSessionExist: true,
                shouldRender: true,
            },
            {
                emailVerificationRequired: true,
                requireAuth: undefined,
                doesSessionExist: false,
                shouldRender: false,
            },
            {
                emailVerificationRequired: true,
                isEmailVerified: false,
                requireAuth: undefined,
                doesSessionExist: true,
                shouldRender: false,
            },

            // it should match sessionAuth behavior otherwise

            {
                emailVerificationRequired: false,
                isEmailVerified: false,
                requireAuth: false,
                doesSessionExist: false,
                shouldRender: true,
            },
            {
                emailVerificationRequired: false,
                isEmailVerified: false,
                requireAuth: true,
                doesSessionExist: false,
                shouldRender: false,
            },
            {
                emailVerificationRequired: false,
                isEmailVerified: false,
                requireAuth: false,
                doesSessionExist: true,
                shouldRender: true,
            },
            {
                emailVerificationRequired: false,
                isEmailVerified: false,
                requireAuth: true,
                doesSessionExist: true,
                shouldRender: true,
            },
        ];

        testCases.forEach(
            ({ doesSessionExist, requireAuth, shouldRender, emailVerificationRequired, isEmailVerified }) => {
                test(`${shouldRender ? "do" : "don't"} render when requireAuth=${requireAuth} and session ${
                    doesSessionExist ? "exists" : "doesn't exist"
                } w/ email verification mode ${
                    emailVerificationRequired ? "required" : "off"
                } and isEmailVerified: ${isEmailVerified}`, async () => {
                    // given
                    emailVerificationConfig.mode = emailVerificationRequired ? "REQUIRED" : "OFF";
                    isEmailVerifiedMock.mockResolvedValue({ isVerified: isEmailVerified });
                    setMockResolvesSession({
                        doesSessionExist,
                        accessTokenPayload: {},
                        userId: "mock-id",
                        loading: false,
                    });

                    // when
                    const result = render(
                        <EmailPasswordAuth requireAuth={requireAuth as any}>
                            <MockSessionConsumer />
                        </EmailPasswordAuth>
                    );

                    if (!requireAuth && result.queryByText("Loading")) {
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
            }
        );

        test("don't render when requireAuth=true and session is loading", async () => {
            // given
            setMockResolvesSession({
                loading: true,
            });

            // when
            const result = render(
                <EmailPasswordAuth requireAuth={true}>
                    <h1>Children</h1>
                </EmailPasswordAuth>
            );

            const child = await result.findByText(/Children/i).catch(() => null);

            // then
            expect(child).not.toBeInTheDocument();
        });

        test("don't render when requireAuth=false and session is loading", async () => {
            // given
            setMockResolvesSession({
                loading: true,
            });

            // when
            const result = render(
                <EmailPasswordAuth requireAuth={false}>
                    <h1>Children</h1>
                </EmailPasswordAuth>
            );

            const child = await result.findByText(/Children/i).catch(() => null);

            // then
            expect(child).not.toBeInTheDocument();
        });
    });
});
