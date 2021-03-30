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
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var normalisedURLPath_1 = __importDefault(require("../../../normalisedURLPath"));
var superTokens_1 = __importDefault(require("../../../superTokens"));
var providerButton_1 = __importDefault(require("../components/library/providerButton"));
/*
 * Imports.
 */
/*
 * Class.
 */
var Provider = /** @class */ (function () {
    /*
     * Constructor.
     */
    function Provider(config) {
        /*
         * State management.
         */
        this.generateState = function () {
            // Generate state using algorithm described in https://github.com/supertokens/supertokens-auth-react/issues/154#issue-796867579
            return ("" + 1e20).replace(/[018]/g, function (c) {
                return (
                    parseInt(c) ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))
                ).toString(16);
            });
        };
        this.id = config.id;
        this.name = config.name;
    }
    /*
     * Components.
     */
    Provider.prototype.getDefaultButton = function (name) {
        var providerName = name !== undefined ? name : this.name;
        return react_1.default.createElement(
            providerButton_1.default,
            { logo: this.getLogo(), providerName: providerName },
            react_1.default.createElement(react_1.Fragment, null, "Continue with ", this.name)
        );
    };
    Provider.prototype.getRedirectURL = function () {
        var domain = superTokens_1.default.getInstanceOrThrow().appInfo.websiteDomain.getAsStringDangerous();
        var callbackPath = new normalisedURLPath_1.default("/callback/" + this.id);
        var path = superTokens_1.default
            .getInstanceOrThrow()
            .appInfo.websiteBasePath.appendPath(callbackPath)
            .getAsStringDangerous();
        return "" + domain + path;
    };
    return Provider;
})();
exports.default = Provider;
//# sourceMappingURL=index.js.map
