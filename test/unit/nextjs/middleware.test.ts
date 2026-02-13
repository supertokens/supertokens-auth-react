/** @jest-environment node */

import { superTokensMiddleware } from "../../../lib/ts/nextjs/middleware";

describe("Next.js middleware", () => {
    const originalFetch = global.fetch;

    afterEach(() => {
        global.fetch = originalFetch;
        jest.restoreAllMocks();
    });

    it("forwards rid header when middleware refreshes session", async () => {
        const fetchMock = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            headers: {
                getSetCookie: () => [
                    "sAccessToken=access-token; Path=/; HttpOnly",
                    "sRefreshToken=refresh-token; Path=/; HttpOnly",
                    "sAntiCsrf=anti-csrf; Path=/; HttpOnly",
                ],
                get: (name: string) => {
                    if (name === "front-token") {
                        return "front-token-value";
                    }
                    return null;
                },
            },
        });
        global.fetch = fetchMock;

        const middleware = superTokensMiddleware({
            appInfo: {
                appName: "test",
                apiDomain: "http://localhost:3031",
                websiteDomain: "http://localhost:3031",
                apiBasePath: "/api/auth",
                websiteBasePath: "/auth",
            },
        });

        const response = await middleware(
            new Request("http://localhost:3031/api/auth/session/refresh", {
                method: "GET",
                headers: {
                    cookie: "sRefreshToken=refresh-token",
                    rid: "session",
                },
            })
        );

        expect(response?.status).toBe(302);
        expect(fetchMock).toHaveBeenCalledTimes(1);

        const fetchOptions = fetchMock.mock.calls[0][1] as RequestInit;
        const headers = fetchOptions.headers as Headers;
        expect(headers.get("rid")).toBe("session");
    });
});
