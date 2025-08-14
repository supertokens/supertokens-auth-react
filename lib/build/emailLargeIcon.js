"use strict";

var genericComponentOverrideContext = require("./genericComponentOverrideContext.js");
var jsxRuntime = require("react/jsx-runtime");

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
/*
 * Component.
 */
function EmailLargeIcon() {
    return jsxRuntime.jsxs(
        "svg",
        genericComponentOverrideContext.__assign(
            { width: "81", height: "74", viewBox: "0 0 81 74", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            {
                children: [
                    jsxRuntime.jsx("rect", {
                        width: "81",
                        height: "74",
                        rx: "12",
                        fill: "#2D3644",
                        fillOpacity: "0.1",
                    }),
                    jsxRuntime.jsx("path", {
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        d: "M22.304 22.0647C21.4909 22.2023 20.7728 22.5533 20.1863 23.0998C18.7101 24.4753 18.6499 26.6951 20.0512 28.0797C20.366 28.3907 21.5186 29.123 29.4316 34.0394C34.3935 37.1223 38.5814 39.7052 38.7381 39.7792C39.2064 40.0002 39.6687 40.1143 40.2244 40.1458C40.8761 40.1827 41.4402 40.1043 41.985 39.9011C42.2986 39.784 44.5964 38.3819 51.3963 34.1584C56.3443 31.0851 60.5173 28.4732 60.6697 28.3541C61.6877 27.5591 62.2023 26.167 61.9144 24.9866C61.6226 23.7897 60.8986 22.9167 59.7616 22.3906C58.8649 21.9756 60.7985 22.015 40.6942 22.003C25.4606 21.9939 22.667 22.0033 22.304 22.0647ZM19.0395 30.4626C18.9759 30.522 18.9942 48.1686 19.0584 48.6611C19.1774 49.5735 19.5459 50.2964 20.1994 50.8994C20.8308 51.482 21.6026 51.8339 22.511 51.9535C22.8345 51.9961 27.7369 52.0074 40.7771 51.9956C57.6349 51.9804 58.6205 51.9745 58.9603 51.8882C60.2693 51.5556 61.3138 50.6712 61.7699 49.5095C62.0053 48.9096 62 49.1399 62 39.5359C62 32.263 61.986 30.4234 61.9309 30.4431C61.8929 30.4567 57.8079 32.987 52.8531 36.066C46.8009 39.8271 43.6631 41.747 43.2918 41.9165C42.9361 42.0787 42.4928 42.2268 42.0483 42.3318C41.4278 42.4783 41.273 42.4951 40.5284 42.4969C40.0474 42.498 39.5717 42.4714 39.3954 42.4335C38.8623 42.319 38.0528 42.0686 37.6821 41.9036C37.4845 41.8156 33.2326 39.2037 28.2334 36.0994C23.2342 32.995 19.129 30.4488 19.1107 30.4412C19.0924 30.4335 19.0604 30.4432 19.0395 30.4626Z",
                        fill: "#2D3644",
                    }),
                ],
            }
        )
    );
}

exports.EmailLargeIcon = EmailLargeIcon;
