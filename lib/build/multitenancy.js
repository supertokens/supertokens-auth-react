"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var MultitenancyWebJS = require("supertokens-web-js/recipe/multitenancy");
var componentOverrideContext = require("./multitenancy-shared.js");
var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/utils");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react/jsx-runtime");

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
        return genericComponentOverrideContext.Multitenancy.init(config);
    };
    Wrapper.AllowedDomainsClaim = MultitenancyWebJS.AllowedDomainsClaim;
    Wrapper.ComponentsOverrideProvider = componentOverrideContext.Provider;
    return Wrapper;
})();
var init = Wrapper.init;
var MultitenancyComponentsOverrideProvider = Wrapper.ComponentsOverrideProvider;

Object.defineProperty(exports, "AllowedDomainsClaim", {
    enumerable: true,
    get: function () {
        return MultitenancyWebJS.AllowedDomainsClaim;
    },
});
exports.MultitenancyComponentsOverrideProvider = MultitenancyComponentsOverrideProvider;
exports.default = Wrapper;
exports.init = init;
