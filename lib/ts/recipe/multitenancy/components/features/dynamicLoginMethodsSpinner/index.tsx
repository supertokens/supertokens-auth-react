/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
import { ComponentOverrideContext } from "../../../../../components/componentOverride/componentOverrideContext";
import { WithOrWithoutShadowDom } from "../../../../../components/featureWrapper";
import { useRecipeComponentOverrideContext } from "../../../componentOverrideContext";
import Multitenancy from "../../../recipe";
import { DynamicLoginMethodsSpinnerTheme } from "../../themes/dynamicLoginMethodsSpinner";

// This is a special "feature" component:
//  - it's used inside FeatureWrapper & RoutingComponent (meaning it can't use FeatureWrapper)
//  - it's not used in any specific route (multitenancy doesn't have a pre-built UI)
const DynamicLoginMethodsSpinner: React.FC = () => {
    const recipe = Multitenancy.getInstanceOrThrow();
    const recipeComponentOverrides = useRecipeComponentOverrideContext();

    return (
        <ComponentOverrideContext.Provider value={recipeComponentOverrides}>
            <WithOrWithoutShadowDom useShadowDom={recipe.config.useShadowDom}>
                <DynamicLoginMethodsSpinnerTheme config={recipe.config} />
            </WithOrWithoutShadowDom>
        </ComponentOverrideContext.Provider>
    );
};

export default DynamicLoginMethodsSpinner;
