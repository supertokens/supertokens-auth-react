"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
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
/*
 * Imports.
 */
var react_1 = require("react");
var translationContext_1 = require("../../../../translation/translationContext");
var styleContext_1 = tslib_1.__importDefault(require("../../../../styles/styleContext"));
/*
 * Component.
 */
function ProviderButton(_a) {
    var logo = _a.logo,
        providerName = _a.providerName,
        displayName = _a.displayName;
    /*
     * Render.
     */
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var t = (0, translationContext_1.useTranslation)();
    var providerStyleName = "provider".concat(providerName);
    return (0, jsx_runtime_1.jsxs)(
        "button",
        tslib_1.__assign(
            {
                css: [styles.providerButton, styles[providerStyleName]],
                "data-supertokens": "providerButton ".concat(providerStyleName),
            },
            {
                children: [
                    logo !== undefined &&
                        (0, jsx_runtime_1.jsx)(
                            "div",
                            tslib_1.__assign(
                                { css: styles.providerButtonLeft, "data-supertokens": "providerButtonLeft" },
                                {
                                    children: (0, jsx_runtime_1.jsx)(
                                        "div",
                                        tslib_1.__assign(
                                            {
                                                css: styles.providerButtonLogo,
                                                "data-supertokens": "providerButtonLogo",
                                            },
                                            {
                                                children: (0, jsx_runtime_1.jsx)(
                                                    "div",
                                                    tslib_1.__assign(
                                                        {
                                                            css: styles.providerButtonLogoCenter,
                                                            "data-supertokens": "providerButtonLogoCenter",
                                                        },
                                                        { children: logo }
                                                    )
                                                ),
                                            }
                                        )
                                    ),
                                }
                            )
                        ),
                    (0, jsx_runtime_1.jsxs)(
                        "div",
                        tslib_1.__assign(
                            { css: styles.providerButtonText, "data-supertokens": "providerButtonText" },
                            {
                                children: [
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_START"),
                                    displayName,
                                    t("THIRD_PARTY_PROVIDER_DEFAULT_BTN_END"),
                                ],
                            }
                        )
                    ),
                ],
            }
        )
    );
}
exports.default = ProviderButton;
