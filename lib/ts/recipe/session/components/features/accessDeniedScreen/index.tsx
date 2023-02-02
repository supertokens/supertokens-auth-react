import React from "react";
import FeatureWrapper from "../../../../../components/featureWrapper";
import { FeatureBaseProps } from "../../../../../types";
import Recipe from "../../../recipe";
import { AccessDeniedTheme } from "../../themes/accessDeniedScreenTheme";
import { defaultTranslationsSession } from "../../themes/translations";

const AccessDeniedScreen: React.FC<
    FeatureBaseProps & {
        recipe: Recipe;
    }
> = () => {
    return (
        <FeatureWrapper defaultStore={defaultTranslationsSession}>
            <AccessDeniedTheme />
        </FeatureWrapper>
    );
};

export default AccessDeniedScreen;
