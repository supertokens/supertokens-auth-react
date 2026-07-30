import React from "react";
import { act, render, waitFor } from "@testing-library/react";

import SuperTokens from "../../../../lib/ts/superTokens";
import OAuth2Provider from "../../../../lib/ts/recipe/oauth2provider/recipe";
import TryRefreshPage from "../../../../lib/ts/recipe/oauth2provider/components/features/tryRefreshPage";
import SessionContext from "../../../../lib/ts/recipe/session/sessionContext";
import type { SessionContextType } from "../../../../lib/ts/recipe/session";

describe("TryRefreshPage", () => {
    beforeEach(() => {
        OAuth2Provider.reset();
        SuperTokens.reset();

        SuperTokens.init({
            appInfo: {
                appName: "JestTest",
                apiDomain: "http://localhost:3001",
                apiBasePath: "/auth",
                websiteDomain: "http://localhost:3000",
                websiteBasePath: "/auth",
            },
            recipeList: [OAuth2Provider.init()],
            useShadowDom: false,
        });

        window.history.pushState({}, "", "/auth/try-refresh?loginChallenge=test-challenge");
    });

    it("continues the OAuth flow only once when the session context updates twice", async () => {
        const recipe = OAuth2Provider.getInstanceOrThrow();
        const getRedirectURLToContinueOAuthFlow = jest
            .spyOn(recipe.webJSRecipe, "getRedirectURLToContinueOAuthFlow")
            .mockResolvedValue({
                status: "OK",
                frontendRedirectTo: "https://client.example.com/callback",
                fetchResponse: {} as Response,
            });
        jest.spyOn(recipe, "redirect").mockResolvedValue(undefined);

        const sessionContext: SessionContextType = {
            loading: false,
            doesSessionExist: true,
            userId: "user-id",
            accessTokenPayload: { iat: 1 },
            invalidClaims: [],
        };

        const { rerender } = render(
            <SessionContext.Provider value={sessionContext}>
                <TryRefreshPage
                    recipe={recipe}
                    userContext={{}}
                    useComponentOverrides={() => ({})}
                    navigate={() => undefined}
                />
            </SessionContext.Provider>
        );

        await waitFor(() => {
            expect(getRedirectURLToContinueOAuthFlow).toHaveBeenCalledTimes(1);
        });

        act(() => {
            rerender(
                <SessionContext.Provider value={{ ...sessionContext, accessTokenPayload: { iat: 2 } }}>
                    <TryRefreshPage
                        recipe={recipe}
                        userContext={{}}
                        useComponentOverrides={() => ({})}
                        navigate={() => undefined}
                    />
                </SessionContext.Provider>
            );
        });

        await act(async () => undefined);
        expect(getRedirectURLToContinueOAuthFlow).toHaveBeenCalledTimes(1);
    });
});
