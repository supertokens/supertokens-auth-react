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
import { useTranslation } from "../../../../../translation/translationContext";

import type { AuthPageThemeProps } from "../../../types";

export const AuthPageComponentList = withOverride(
    "AuthPageComponentList",
    function AuthPageComponentList(props: AuthPageThemeProps): JSX.Element | null {
        const t = useTranslation();

        const list = [props.authComponents[0]];
        for (let i = 1; i < props.authComponents.length; ++i) {
            list.push(() => (
                <div key={`divider-${i}`} data-supertokens="dividerWithOr">
                    <div data-supertokens="divider"></div>
                    <div data-supertokens="dividerText">{t("DIVIDER_OR")}</div>
                    <div data-supertokens="divider"></div>
                </div>
            ));
            list.push(props.authComponents[i]);
        }
        return (
            <div data-supertokens="authComponentList">
                {list.map((i) =>
                    i({
                        ...props,
                    })
                )}
            </div>
        );
    }
);
