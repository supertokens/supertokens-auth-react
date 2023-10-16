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

import { withOverride } from "../../../../../components/componentOverride/withOverride";

import { FactorOption } from "./factorOption";

import type { SecondaryFactorRedirectionInfo } from "../../../types";
import type { MFAFactorInfo } from "supertokens-web-js/recipe/multifactorauth/types";

export const FactorList = withOverride(
    "MultiFactorAuthFactorList",
    function MultiFactorAuthFactorList({
        availableFactors,
        navigateToFactor,
    }: {
        availableFactors: SecondaryFactorRedirectionInfo[];
        mfaInfo: MFAFactorInfo;
        navigateToFactor: (factorId: string) => void;
    }): JSX.Element {
        return (
            <div data-supertokens="row factorChooserList">
                {availableFactors.map((factor) => (
                    <FactorOption
                        key={factor.id}
                        name={factor.name}
                        description={factor.description}
                        logo={factor.logo}
                        onClick={() => navigateToFactor(factor.id)}
                    />
                ))}
            </div>
        );
    }
);
