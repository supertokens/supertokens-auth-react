import React, { useEffect, useState } from "react";
import { ClaimValidationError } from "supertokens-web-js/recipe/session";
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { FeatureBaseProps } from "../../../../../types";
import { getLocalStorage } from "../../../../../utils";
import { useRecipeComponentOverrideContext } from "../../../componentOverrideContext";
import Recipe from "../../../recipe";
import { AccessDeniedTheme } from "../../themes/accessDeniedScreenTheme";
import { defaultTranslationsSession } from "../../themes/translations";

const AccessDeniedScreen: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
    }
> = (props) => {
    const [accessDenialInfo, setAccessDenialInfo] = useState<ClaimValidationError | undefined>();
    const recipeComponentOverrides = useRecipeComponentOverrideContext();

    useEffect(() => {
        void retrieveAccessDenialInfo();
    }, []);

    const retrieveAccessDenialInfo = async () => {
        const denialInfo = await getLocalStorage("supertokens-access-denial-info");
        if (typeof denialInfo === "string") {
            setAccessDenialInfo(JSON.parse(denialInfo));
        }
    };

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper defaultStore={defaultTranslationsSession}>
                <AccessDeniedTheme config={props.recipe.config} denialInfo={accessDenialInfo} />
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default AccessDeniedScreen;
