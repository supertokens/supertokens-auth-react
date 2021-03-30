"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
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
/** @jsx jsx */
var react_1 = require("@emotion/react");
var signInHeader_1 = __importDefault(require("../../../../emailpassword/components/themes/signInAndUp/signInHeader"));
var signUpHeader_1 = __importDefault(require("../../../../emailpassword/components/themes/signInAndUp/signUpHeader"));
/*
 * Component.
 */
function Header(_a) {
    var isSignUp = _a.isSignUp,
        setIsSignUp = _a.setIsSignUp;
    /*
     * Render.
     */
    if (isSignUp === true) {
        return react_1.jsx(signUpHeader_1.default, {
            onClick: function () {
                return setIsSignUp(false);
            },
        });
    } else {
        return react_1.jsx(signInHeader_1.default, {
            onClick: function () {
                return setIsSignUp(true);
            },
        });
    }
}
exports.default = Header;
//# sourceMappingURL=header.js.map
