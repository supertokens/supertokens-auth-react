"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var MultitenancyWebJS = require("supertokens-web-js/recipe/multitenancy");
var superTokens = require("./superTokens.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");

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
var Wrapper = /** @class */ (function () {
    function Wrapper() {}
    Wrapper.init = function (config) {
        return superTokens.Multitenancy.init(config);
    };
    Wrapper.AllowedDomainsClaim = MultitenancyWebJS.AllowedDomainsClaim;
    return Wrapper;
})();
var init = Wrapper.init;

Object.defineProperty(exports, "AllowedDomainsClaim", {
    enumerable: true,
    get: function () {
        return MultitenancyWebJS.AllowedDomainsClaim;
    },
});
exports.default = Wrapper;
exports.init = init;
