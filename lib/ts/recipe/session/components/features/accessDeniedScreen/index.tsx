import React, { useEffect, useState } from "react";

import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { getLocalStorage } from "../../../../../utils";
import { AccessDeniedTheme } from "../../themes/accessDeniedScreenTheme";
import { defaultTranslationsSession } from "../../themes/translations";

import type { FeatureBaseProps } from "../../../../../types";
import type Recipe from "../../../recipe";
import type { ComponentOverrideMap } from "../../../types";
import type { ClaimValidationError } from "supertokens-web-js/recipe/session";

const AccessDeniedScreen: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
        useComponentOverrides: () => ComponentOverrideMap;
    }
> = (props) => {
    const [accessDenialInfo, setAccessDenialInfo] = useState<ClaimValidationError | undefined>();
    const recipeComponentOverrides = props.useComponentOverrides();

    useEffect(() => {
        const retrieveAccessDenialInfo = async () => {
            const denialInfo = await getLocalStorage("supertokens-access-denial-info");
            if (typeof denialInfo === "string") {
                setAccessDenialInfo(JSON.parse(denialInfo));
            }
        };
        void retrieveAccessDenialInfo();
    }, []);

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <FeatureWrapper defaultStore={defaultTranslationsSession}>
                <AccessDeniedTheme config={props.recipe.config} denialInfo={accessDenialInfo} />
            </FeatureWrapper>
        </ComponentOverrideContext.Provider>
    );
};

export default AccessDeniedScreen;
