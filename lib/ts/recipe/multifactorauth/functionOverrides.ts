import { WindowHandlerReference } from "supertokens-web-js/utils/windowHandler";

import { MFA_INFO_CACHE_KEY } from "./constants";

import type { OnHandleEventContext } from "./types";
import type { RecipeOnHandleEventFunction } from "../recipeModule/types";
import type { RecipeInterface } from "supertokens-web-js/recipe/multifactorauth";

// This is a simple in-memory lock using a promise
// We do not need anything more complex than this, since the cache we are locking is in sessionStorage anyway.
let lockProm: Promise<void> | undefined = undefined;

export const getFunctionOverrides =
    (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _onHandleEvent: RecipeOnHandleEventFunction<OnHandleEventContext>
    ) =>
    (originalImp: RecipeInterface): RecipeInterface => ({
        ...originalImp,
        resyncSessionAndFetchMFAInfo: async function (input) {
            const stWindow = WindowHandlerReference.getReferenceOrThrow();
            // If someone is refreshing from the server we wait for it to finish.
            await lockProm;

            // Here we know no-one is currently writing the cache (even though we haven't locked it ourselves)
            // Even if someone were to obtain while we are reading the sessionStorage should return consistent info
            const stored = await stWindow.windowHandler.sessionStorage.getItem(MFA_INFO_CACHE_KEY);
            if (stored !== null) {
                const parsed = JSON.parse(stored);
                if (parsed.t > Date.now() - 1000) {
                    return {
                        ...parsed.v,
                        // Adding a fake response is not great, but we do want to add something and this way it's detectable by the app
                        // so they could even add specific handling for it if they preferred.
                        fetchResponse: new Response(null, { status: 304 }),
                    };
                }
            }

            // We obtain a lock in case of a cache-miss
            let unlock: () => void;
            // We need to add a while here, since someone else could've acquired the lock after the promise resolved.
            // JS is single threaded, so when we get out of this while loop we know lockProm is undefined until we set it in the next line
            while (lockProm !== undefined) {
                await lockProm;
            }
            lockProm = new Promise((res) => (unlock = res));

            // We are releasing the lock in finally to make sure it doesn't get stuck.
            try {
                // Once we added a lock, we re-read the cache, someone else may have updated it
                const stored = await stWindow.windowHandler.sessionStorage.getItem(MFA_INFO_CACHE_KEY);
                if (stored !== null) {
                    const parsed = JSON.parse(stored);
                    if (parsed.t > Date.now() - 1000) {
                        return {
                            ...parsed.v,
                            // Adding a fake response is not great, but we do want to add something and this way it's detectable by the app
                            // so they could even add specific handling for it if they preferred.
                            fetchResponse: new Response(null, { status: 304 }),
                        };
                    }
                }

                // Refresh from the server
                const val = await originalImp.resyncSessionAndFetchMFAInfo(input);

                if (val.status === "OK") {
                    // We are not storing the fetchResponse
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
            } finally {
                // Release the lock
                lockProm = undefined;
                unlock!();
            }
        },
    });
