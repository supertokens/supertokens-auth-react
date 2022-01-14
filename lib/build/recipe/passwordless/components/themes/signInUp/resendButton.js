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
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = __importStar(require("react"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
exports.ResendButton = withOverride_1.withOverride("PasswordlessResendButton", function PasswordlessResendButton(_a) {
    var loginAttemptInfo = _a.loginAttemptInfo,
        resendEmailOrSMSGapInSeconds = _a.resendEmailOrSMSGapInSeconds,
        target = _a.target,
        onClick = _a.onClick;
    var styles = react_2.useContext(styleContext_1.default);
    var getTimeLeft = react_2.useCallback(
        function () {
            var timeLeft = loginAttemptInfo.lastResend + resendEmailOrSMSGapInSeconds * 1000 - new Date().getTime();
            return timeLeft < 0 ? undefined : Math.ceil(timeLeft / 1000);
        },
        [loginAttemptInfo, resendEmailOrSMSGapInSeconds]
    );
    var _b = react_2.useState(getTimeLeft()),
        secsUntilResend = _b[0],
        setSecsUntilResend = _b[1];
    react_2.useEffect(
        function () {
            // This runs every time the loginAttemptInfo, so after every resend
            var interval = setInterval(function () {
                var timeLeft = getTimeLeft();
                if (timeLeft === undefined) {
                    clearInterval(interval);
                }
                setSecsUntilResend(timeLeft);
            }, 500);
            return function () {
                // This can safely run twice
                clearInterval(interval);
            };
        },
        [getTimeLeft, setSecsUntilResend]
    );
    return react_1.jsx(
        "button",
        {
            type: "button",
            disabled: secsUntilResend !== undefined,
            onClick: onClick,
            css: [styles.link, styles.linkButton, styles.resendCodeBtn],
            "data-supertokens": "link linkButton resendCodeBtn",
        },
        secsUntilResend !== undefined
            ? react_1.jsx(
                  react_2.default.Fragment,
                  null,
                  "Resend in",
                  " ",
                  react_1.jsx(
                      "strong",
                      null,
                      Math.floor(secsUntilResend / 60)
                          .toString()
                          .padStart(2, "0"),
                      ":",
                      (secsUntilResend % 60).toString().padStart(2, "0")
                  )
              )
            : "Resend " + target
    );
});
