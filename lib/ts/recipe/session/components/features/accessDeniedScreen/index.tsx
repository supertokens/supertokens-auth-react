import React from "react";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import UI from "../../../../../ui";
import { AccessDeniedTheme } from "../../themes/accessDeniedScreenTheme";
import { defaultTranslationsSession } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";

const AccessDeniedScreen: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    const recipeComponentOverrides = props.useComponentOverrides();
    const history = UI.getReactRouterDomWithCustomHistory()?.useHistoryCustom();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper defaultStore={defaultTranslationsSession}>
                <AccessDeniedTheme config={props.recipe.config} history={history} recipe={props.recipe} />
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default AccessDeniedScreen;
