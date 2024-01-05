import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { MFA_INFO_CACHE_KEY } from "./constants";

import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";

export const getFunctionOverrides =
    (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
    ) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        resyncSessionAndFetchMFAInfo: async function (input) {
            const stWindow = WindowHandlerReference.getReferenceOrThrow();
            const stored = await stWindow.windowHandler.sessionStorage.getItem(MFA_INFO_CACHE_KEY);
            if (stored !== null) {
                const parsed = JSON.parse(stored);
                if (parsed.t > Date.now() - 1000) {
                    return {
                        ...parsed.v,
                        fetchResponse: new Response(null, { status: 304 }), // TODO: check this
                    };
                }
            }

            const val = await originalImp.resyncSessionAndFetchMFAInfo(input);

            if (val.status === "OK") {
                // We are explicitly not storing the fetchResponse
                await stWindow.windowHandler.sessionStorage.setItem(
                    MFA_INFO_CACHE_KEY,
                    JSON.stringify({
                        t: Date.now(),
                        v: {
                            emails: val.emails,
                            phoneNumbers: val.phoneNumbers,
                            factors: val.factors,
                            status: val.status,
                        },
                    })
                );
            }
            return val;
        },
    });
