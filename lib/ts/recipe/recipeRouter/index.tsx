import { logDebugMessage } from "../../logger";
import SuperTokens from "../../superTokens";
import MultiFactorAuth from "../multifactorauth/recipe";
import { FactorIds } from "../multifactorauth/types";

import type { RecipeFeatureComponentMap } from "../../types";
import type { BaseFeatureComponentMap, ComponentWithRecipeAndMatchingMethod } from "../../types";
import type { GetLoginMethodsResponseNormalized } from "../multitenancy/types";
import type RecipeModule from "../recipeModule";
import type NormalisedURLPath from "supertokens-web-js/lib/build/normalisedURLPath";

// The related ADR: https://supertokens.com/docs/contribute/decisions/multitenancy/0006
const priorityOrder: {
    rid: string;
    includes: ("thirdparty" | "emailpassword" | "passwordless")[];
    factorsProvided: string[];
}[] = [
    {
        rid: "thirdpartyemailpassword",
        includes: ["thirdparty", "emailpassword"],
        factorsProvided: [FactorIds.THIRDPARTY, FactorIds.EMAILPASSWORD],
    },
    {
        rid: "thirdpartypasswordless",
        includes: ["thirdparty", "passwordless"],
        factorsProvided: [
            FactorIds.THIRDPARTY,
            FactorIds.OTP_PHONE,
            FactorIds.OTP_EMAIL,
            FactorIds.LINK_PHONE,
            FactorIds.LINK_EMAIL,
        ],
    },
    { rid: "emailpassword", includes: ["emailpassword"], factorsProvided: [FactorIds.EMAILPASSWORD] },
    {
        rid: "passwordless",
        includes: ["passwordless"],
        factorsProvided: [FactorIds.OTP_PHONE, FactorIds.OTP_EMAIL, FactorIds.LINK_PHONE, FactorIds.LINK_EMAIL],
    },
    { rid: "thirdparty", includes: ["thirdparty"], factorsProvided: [FactorIds.THIRDPARTY] },
];

function chooseComponentBasedOnFirstFactors(
    firstFactors: string[],
    routeComponents: ComponentWithRecipeAndMatchingMethod[]
) {
    let fallbackRid;
    let fallbackComponent;
    // We first try to find an exact match, and fall back on something that covers all factors (but maybe more)
    /*
        Examples:
            1. firstFactors: emailpassword, route components from: thirdparty ->
                - no matches found, throwing error

            2. firstFactors: emailpassword, route components from: thirdpartyemailpassword ->
                - we find thirdpartyemailpassword covers all first factors, save it as fallback
                - we check all other recipes, bot nothing else has matching components
                - return fallback from TPEP

            3. firstFactors: emailpassword, route components from: thirdpartyemailpassword, emailpassword ->
                - we find thirdpartyemailpassword covers all first factors, save it as fallback
                - we find emailpassword as an exact match and return it

            4. firstFactors: otp-phone, route components from: thirdpartypasswordless, passwordless, thirdparty ->
                - we find thirdpartypasswordless covers all first factors (but more), save it as fallback
                - we find passwordless that covers all factors (but more), saving it as a fallback.
                  Keep in mind, that the passwordless and thirdpartypasswordless recipe provides 4 factors, so this is not an exact match.
                - no other recipes have matching components, so we return the fallback from passwordless

            5. firstFactors: thirdparty, otp-phone, route components from: thirdpartypasswordless, passwordless, thirdparty ->
                - we find thirdpartypasswordless covers all first factors (but more), save it as fallback
                  this is not an exact match, because thirdpartypasswordless provides multiple passwordless factors.
                - no other recipes cover all factors, so we return the fallback from thirdpartypasswordless
    */
    for (const { rid, factorsProvided } of priorityOrder) {
        if (firstFactors.every((factor) => factorsProvided.includes(factor))) {
            const matchingComp = routeComponents.find((comp) => comp.recipeID === rid);
            if (matchingComp) {
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
    public abstract recipeInstance: RecipeModule<never, any, any, any>;
    static getMatchingComponentForRouteAndRecipeIdFromPreBuiltUIList(
        normalisedUrl: NormalisedURLPath,
        preBuiltUIList: RecipeRouter[],
        defaultToStaticList: boolean,
        dynamicLoginMethods?: GetLoginMethodsResponseNormalized
    ): ComponentWithRecipeAndMatchingMethod | undefined {
        const path = normalisedUrl.getAsStringDangerous();
        // We check if we are on the auth page to later see if we should take first factors into account.
        const isNonAuthPage = path !== SuperTokens.getInstanceOrThrow().appInfo.websiteBasePath.getAsStringDangerous();

        // We get all components that can handle the current path
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

        // We check the query params to see if any recipe was requested by id
        const componentMatchingRid = routeComponents.find((c) => c.matches());

        // We default to to one requested by id or the first in the list
        // i.e.: the first prebuilt ui in the list the user provided that can handle this route.
        let defaultComp;
        if (routeComponents.length === 0) {
            defaultComp = undefined;
        } else if (componentMatchingRid !== undefined) {
            defaultComp = componentMatchingRid;
        } else {
            defaultComp = routeComponents[0];
        }

        // We check if any non-auth recipe (emailverification, totp) can handle this
        // There should be no overlap between the routes handled by those and the auth recipes
        // so if there is a match we can return early
        const matchingNonAuthComponent = routeComponents.find(
            (comp) => !priorityOrder.map((a) => a.rid).includes(comp.recipeID)
        );

        if (matchingNonAuthComponent) {
            return matchingNonAuthComponent;
        }

        // We use this option in `canHandleRoute`, because it may be called by custom UIs before
        // dynamic login methods are loaded.
        if (defaultToStaticList) {
            return defaultComp;
        }

        const mfaRecipe = MultiFactorAuth.getInstance();
        if (SuperTokens.usesDynamicLoginMethods === false) {
            // If we are not using dynamic login methods, we can use the rid requested by the app
            if (componentMatchingRid) {
                return componentMatchingRid;
            }

            // if we have a static firstFactors config we take it into account on the auth page
            // Other pages shouldn't care about this configuration.
            // Embedded components are not affected, since this is only called by the routing component.
            if (!isNonAuthPage && mfaRecipe && mfaRecipe.config.firstFactors !== undefined) {
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

        // If we are using dynamic login methods, we check that the requested rid belongs to an enabled recipe
        if (
            componentMatchingRid && // if we find a component matching by rid
            (!priorityOrder.map((a) => a.rid).includes(componentMatchingRid.recipeID) || // from a non-auth recipe
                dynamicLoginMethods[componentMatchingRid.recipeID as "passwordless" | "thirdparty" | "emailpassword"]
                    ?.enabled === true) // or an enabled auth recipe
        ) {
            return componentMatchingRid;
        }

        // if we have a firstFactors config for the tenant we take it into account on the auth page
        // Other pages shouldn't care about this configuration.
        // Embedded components are not affected, since this is only called by the routing component.
        if (!isNonAuthPage && dynamicLoginMethods.firstFactors !== undefined) {
            return chooseComponentBasedOnFirstFactors(dynamicLoginMethods.firstFactors, routeComponents);
        }

        // We may get here if the app is using an older BE that doesn't support MFA or if the tenant
        // has an older config that doesn't have the firstFactors array
        const enabledRecipeCount = Object.keys(dynamicLoginMethods).filter(
            (key) => (dynamicLoginMethods as any)[key]?.enabled === true
        ).length;
        // We try and choose which component to show based on the enabled login methods
        // We first try to find an exact match (a recipe that covers all enabled login methods and nothing else)
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
        // We try to find a partial match (so any recipe that overlaps with the enabled login methods)
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
