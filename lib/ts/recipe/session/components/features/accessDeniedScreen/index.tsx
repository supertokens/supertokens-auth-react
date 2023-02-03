import React from "react";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { FeatureBaseProps } from "../../../../../types";
import { useRecipeComponentOverrideContext } from "../../../componentOverrideContext";
import Recipe from "../../../recipe";
import { AccessDeniedTheme } from "../../themes/accessDeniedScreenTheme";
import { defaultTranslationsSession } from "../../themes/translations";

const AccessDeniedScreen: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
    }
> = (props) => {
    const recipeComponentOverrides = useRecipeComponentOverrideContext();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper defaultStore={defaultTranslationsSession}>
                <AccessDeniedTheme config={props.recipe.config} />
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default AccessDeniedScreen;
