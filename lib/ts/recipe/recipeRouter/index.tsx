import { logDebugMessage } from "../../logging";
import SuperTokens from "../../superTokens";
import MultiFactorAuth from "../multifactorauth/recipe";

import type { RecipeFeatureComponentMap } from "../../types";
import type { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import type { GetLoginMethodsResponseNormalized } from "../multitenancy/types";
import type RecipeModule from "../recipeModule";
import type NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";

// The related ADR: https://supertokens.com/docs/contribute/decisions/multitenancy/0006
// TODO: This could be by the recipes registering what factors they provide (at least partially)
const priorityOrder: {
    rid: string;
    includes: ("thirdparty" | "emailpassword" | "passwordless")[];
    factorsProvided: string[];
}[] = [
    {
        rid: "thirdpartyemailpassword",
        includes: ["thirdparty", "emailpassword"],
        factorsProvided: ["thirdparty", "emailpassword"],
    },
    {
        rid: "thirdpartypasswordless",
        includes: ["thirdparty", "passwordless"],
        factorsProvided: ["thirdparty", "otp-phone", "otp-email", "link-phone", "link-email"],
    },
    { rid: "emailpassword", includes: ["emailpassword"], factorsProvided: ["emailpassword"] },
    {
        rid: "passwordless",
        includes: ["passwordless"],
        factorsProvided: ["otp-phone", "otp-email", "link-phone", "link-email"],
    },
    { rid: "thirdparty", includes: ["thirdparty"], factorsProvided: ["thirdparty"] },
];

function chooseComponentBasedOnFirstFactors(
    firstFactors: string[],
    routeComponents: ComponentWithRecipeAndMatchingMethod[]
) {
    let fallbackRid;
    let fallbackComponent;
    // We first try to find an exact match, and fall back on something that covers all factors (but maybe more)
    for (const { rid, factorsProvided } of priorityOrder) {
        if (firstFactors.every((factor) => factorsProvided.includes(factor))) {
            const matchingComp = routeComponents.find((comp) => comp.recipeID === rid);
            if (matchingComp) {
                // This means that this gets overwritten by items lower in the prios list.
                // This is intentional since this way we end up with the most specific recipe that covers all required factrors (pwless instead of tppwless)
                fallbackRid = rid;
                fallbackComponent = matchingComp;
                if (firstFactors.length === factorsProvided.length) {
                    logDebugMessage(`Rendering ${rid} because it matches factors: ${firstFactors} exactly`);
                    return matchingComp;
                }
            }
        }
    }

    if (fallbackComponent === undefined) {
        throw new Error("No enabled recipes overlap with the requested firstFactors: " + firstFactors);
    }

    logDebugMessage(`Rendering ${fallbackRid} to cover ${firstFactors}`);
    return fallbackComponent;
}

export abstract class RecipeRouter {
    private pathsToFeatureComponentWithRecipeIdMap?: BaseFeatureComponentMap;
    public abstract recipeInstance: RecipeModule<any, any, any, any>;
    static getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
        normalisedUrl: NormalisedURLPath,
        preBuiltUIList: RecipeRouter[],
        defaultToStaticList: boolean,
        dynamicLoginMethods?: GetLoginMethodsResponseNormalized
    ): ComponentWithRecipeAndMatchingMethod | undefined {
        const path = normalisedUrl.getAsStringDangerous();

        const routeComponents = preBuiltUIList.reduce((components, c) => {
            const routes = c.getPathsToFeatureComponentWithRecipeIdMap();
            for (const [routePath, routeComps] of Object.entries(routes)) {
                if (
                    routePath === path ||
                    new RegExp("^" + routePath.replace(/:\w+/g, "[^/]+").replace(/\/\*/g, "/[^/]+") + "$").test(path)
                ) {
                    components = components.concat(routeComps);
                }
            }
            return components;
        }, [] as ComponentWithRecipeAndMatchingMethod[]);

        const componentMatchingRid = routeComponents.find((c) => c.matches());

        let defaultComp;
        if (routeComponents.length === 0) {
            defaultComp = undefined;
        } else if (componentMatchingRid !== undefined) {
            defaultComp = componentMatchingRid;
        } else {
            defaultComp = routeComponents[0];
        }

        const matchingNonAuthComponent = routeComponents.find(
            (comp) => !priorityOrder.map((a) => a.rid).includes(comp.recipeID)
        );

        if (matchingNonAuthComponent) {
            return matchingNonAuthComponent;
        }

        if (defaultToStaticList) {
            return defaultComp;
        }

        const mfaRecipe = MultiFactorAuth.getInstance();
        if (SuperTokens.usesDynamicLoginMethods === false) {
            if (componentMatchingRid) {
                return componentMatchingRid;
            }

            if (mfaRecipe && mfaRecipe.config.firstFactors !== undefined) {
                return chooseComponentBasedOnFirstFactors(mfaRecipe.config.firstFactors, routeComponents);
            } else {
                return defaultComp;
            }
        }

        if (dynamicLoginMethods === undefined) {
            throw new Error(
                "Should never come here: dynamic login methods info has not been loaded but recipeRouter rendered"
            );
        }

        if (
            componentMatchingRid && // if we find a component matching by rid
            (!priorityOrder.map((a) => a.rid).includes(componentMatchingRid.recipeID) || // from a non-auth recipe
                dynamicLoginMethods[componentMatchingRid.recipeID as "passwordless" | "thirdparty" | "emailpassword"]
                    ?.enabled === true) // or an enabled auth recipe
        ) {
            return componentMatchingRid;
        }

        if (dynamicLoginMethods.firstFactors !== undefined) {
            return chooseComponentBasedOnFirstFactors(dynamicLoginMethods.firstFactors, routeComponents);
        }

        // TODO: do we even need the else branch? (maybe for backwards comp.)
        const enabledRecipeCount = Object.keys(dynamicLoginMethods).filter(
            (key) => (dynamicLoginMethods as any)[key].enabled
        ).length;
        // We first try to find an exact match
        for (const { rid, includes } of priorityOrder) {
            if (
                enabledRecipeCount === includes.length &&
                includes.every((subRId) => dynamicLoginMethods[subRId].enabled)
            ) {
                const matchingComp = routeComponents.find((comp) => comp.recipeID === rid);
                if (matchingComp) {
                    return matchingComp;
                }
            }
        }
        // We try to find a partial match
        for (const { rid, includes } of priorityOrder) {
            if (includes.some((subRId) => dynamicLoginMethods[subRId].enabled)) {
                const matchingComp = routeComponents.find((comp) => comp.recipeID === rid);
                if (matchingComp) {
                    return matchingComp;
                }
            }
        }

        return undefined;
    }

    getPathsToFeatureComponentWithRecipeIdMap = (): BaseFeatureComponentMap => {
        // Memoized version of the map.
        if (this.pathsToFeatureComponentWithRecipeIdMap !== undefined) {
            return this.pathsToFeatureComponentWithRecipeIdMap;
        }

        const pathsToFeatureComponentWithRecipeIdMap: BaseFeatureComponentMap = {};
        const features = this.getFeatures();
        const featurePaths = Object.keys(features);
        for (let j = 0; j < featurePaths.length; j++) {
            // If no components yet for this route, initialize empty array.
            const featurePath = featurePaths[j];
            if (pathsToFeatureComponentWithRecipeIdMap[featurePath] === undefined) {
                pathsToFeatureComponentWithRecipeIdMap[featurePath] = [];
            }
            pathsToFeatureComponentWithRecipeIdMap[featurePath].push(features[featurePath]);
        }

        this.pathsToFeatureComponentWithRecipeIdMap = pathsToFeatureComponentWithRecipeIdMap;
        return this.pathsToFeatureComponentWithRecipeIdMap;
    };

    abstract getFeatures(): RecipeFeatureComponentMap;
}
