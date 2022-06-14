"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var utils_1 = require("../../../utils");
var error_1 = tslib_1.__importDefault(require("supertokens-web-js/utils/error"));
var usercontext_1 = require("../../../../../usercontext");
exports.ThirdPartySignInAndUpProvidersForm = function (props) {
    var styles = react_2.useContext(styleContext_1.default);
    var userContext = usercontext_1.useUserContext();
    var signInClick = function (providerId) {
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var response, generalError, e_1, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        response = void 0;
                        generalError = void 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [
                            4 /*yield*/,
                            utils_1.redirectToThirdPartyLogin({
                                recipeImplementation: props.recipeImplementation,
                                thirdPartyId: providerId,
                                config: props.config,
                                userContext: userContext,
                            }),
                        ];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        if (error_1.default.isThisError(e_1)) {
                            generalError = e_1;
                        } else {
                            throw e_1;
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        if (generalError !== undefined) {
                            props.dispatch({
                                type: "setError",
                                error: generalError.message,
                            });
                        } else {
                            if (response === undefined) {
                                throw new Error("Should not come here");
                            }
                            if (response.status === "ERROR") {
                                props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        props.dispatch({ type: "setError", error: "SOMETHING_WENT_WRONG_ERROR" });
                        return [3 /*break*/, 6];
                    case 6:
                        return [2 /*return*/];
                }
            });
        });
    };
    return react_1.jsx(
        react_2.Fragment,
        null,
        props.providers.map(function (provider) {
            return react_1.jsx(
                "div",
                {
                    key: "provider-" + provider.id,
                    css: styles.providerContainer,
                    "data-supertokens": "providerContainer",
                },
                react_1.jsx(
                    "span",
                    {
                        onClick: function () {
                            return signInClick(provider.id);
                        },
                    },
                    provider.buttonComponent
                )
            );
        })
    );
};
exports.ProvidersForm = withOverride_1.withOverride(
    "ThirdPartySignInAndUpProvidersForm",
    exports.ThirdPartySignInAndUpProvidersForm
);
