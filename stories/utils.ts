import SuperTokens from "../lib/ts/superTokens";
import SessionRecipe from "../lib/ts/recipe/session/recipe";
import Session from "../lib/ts/recipe/session";

export function withFetchResponse<T>(resp: T): T & { fetchResponse: Response } {
    return resp as any;
}

export function resetAndInitST(recipeList?: any[]) {
    SessionRecipe.reset();
    SuperTokens.reset();
    SuperTokens.init({
        appInfo: {
            apiDomain: "http://localhost:3000",
            appName: "Storybook test",
            websiteDomain: "http://localhost:6006",
        },
        recipeList: recipeList ?? [Session.init()],
    });
}
