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
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
/*
 * Component.
 */
function ShowPasswordIcon(_a) {
    var primaryColor = _a.primaryColor,
        secondaryColor = _a.secondaryColor,
        showPassword = _a.showPassword;
    if (showPassword === true) {
        return react_1.jsx(
            "div",
            null,
            react_1.jsx(
                "svg",
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "18.391",
                    height: "16.276",
                    viewBox: "0 0 18.391 16.276",
                },
                react_1.jsx(
                    "g",
                    null,
                    react_1.jsx(
                        "g",
                        null,
                        react_1.jsx(
                            "g",
                            null,
                            react_1.jsx(
                                "g",
                                null,
                                react_1.jsx("path", {
                                    fill: primaryColor,
                                    d:
                                        "M29.289 100.33c-2.4-3.63-5.619-5.63-9.069-5.63s-6.67 2-9.069 5.63a.767.767 0 0 0 0 .845c2.4 3.63 5.619 5.63 9.069 5.63s6.67-2 9.069-5.63a.767.767 0 0 0 0-.845zm-9.069 4.944c-2.785 0-5.435-1.6-7.5-4.519 2.065-2.92 4.715-4.519 7.5-4.519s5.435 1.6 7.5 4.519c-2.064 2.92-4.711 4.519-7.5 4.519z",
                                    transform:
                                        "translate(-822 -420.048) translate(822 422.035) translate(-11.025 -94.7)",
                                })
                            )
                        )
                    ),
                    react_1.jsx(
                        "g",
                        {
                            fill: primaryColor,
                            stroke: secondaryColor,
                            transform: "translate(-822 -420.048) translate(827.164 424.055)",
                        },
                        react_1.jsx("circle", { cx: "4.036", cy: "4.036", r: "4.036", stroke: "none" }),
                        react_1.jsx("circle", { cx: "4.036", cy: "4.036", r: "3.536", fill: "none" })
                    ),
                    react_1.jsx("path", {
                        fill: "none",
                        stroke: "#707070",
                        "stroke-linecap": "round",
                        "stroke-width": "2.25px",
                        d: "M11.981 0L0 11.981",
                        transform: "translate(-822 -420.048) translate(825.084 421.639)",
                    }),
                    react_1.jsx("path", {
                        fill: "none",
                        stroke: secondaryColor,
                        "stroke-linecap": "round",
                        d: "M13.978 0L0 13.978",
                        transform: "translate(-822 -420.048) translate(825.084 421.639)",
                    })
                )
            )
        );
    }
    return react_1.jsx(
        "div",
        null,
        react_1.jsx(
            "svg",
            { xmlns: "http://www.w3.org/2000/svg", width: "18.281", height: "12.033", viewBox: "0 0 18.281 12.033" },
            react_1.jsx(
                "g",
                null,
                react_1.jsx(
                    "g",
                    null,
                    react_1.jsx(
                        "g",
                        null,
                        react_1.jsx(
                            "g",
                            null,
                            react_1.jsx("path", {
                                fill: primaryColor,
                                d:
                                    "M29.18 100.3c-2.384-3.608-5.586-5.6-9.015-5.6s-6.63 1.989-9.015 5.6a.763.763 0 0 0 0 .84c2.384 3.608 5.586 5.6 9.015 5.6s6.63-1.989 9.015-5.6a.763.763 0 0 0 0-.84zm-9.015 4.914c-2.769 0-5.4-1.589-7.459-4.492 2.052-2.9 4.686-4.492 7.459-4.492s5.4 1.589 7.459 4.492c-2.056 2.899-4.686 4.489-7.458 4.489z",
                                transform: "translate(-822 -422.088) translate(822 422.088) translate(-11.025 -94.7)",
                            })
                        )
                    )
                ),
                react_1.jsx(
                    "g",
                    {
                        fill: primaryColor,
                        stroke: secondaryColor,
                        transform: "translate(-822 -422.088) translate(827.133 424.096)",
                    },
                    react_1.jsx("circle", { cx: "4.012", cy: "4.012", r: "4.012", stroke: "none" }),
                    react_1.jsx("circle", { cx: "4.012", cy: "4.012", r: "3.512", fill: "none" })
                )
            )
        )
    );
}
exports.default = ShowPasswordIcon;
//# sourceMappingURL=showPasswordIcon.js.map
