"use strict";

var jsxRuntime = require("react/jsx-runtime");

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
    extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
            function (d, b) {
                d.__proto__ = b;
            }) ||
        function (d, b) {
            for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}

exports.__assign = function () {
    exports.__assign =
        Object.assign ||
        function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
    return exports.__assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P
            ? value
            : new P(function (resolve) {
                  resolve(value);
              });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = {
            label: 0,
            sent: function () {
                if (t[0] & 1) throw t[1];
                return t[1];
            },
            trys: [],
            ops: [],
        },
        f,
        y,
        t,
        g;
    return (
        (g = { next: verb(0), throw: verb(1), return: verb(2) }),
        typeof Symbol === "function" &&
            (g[Symbol.iterator] = function () {
                return this;
            }),
        g
    );
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (
                    ((f = 1),
                    y &&
                        (t =
                            op[0] & 2
                                ? y["return"]
                                : op[0]
                                ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                                : y.next) &&
                        !(t = t.call(y, op[1])).done)
                )
                    return t;
                if (((y = 0), t)) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];
                y = 0;
            } finally {
                f = t = 0;
            }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
}

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
function ArrowRightIcon() {
    // TODO: fill color
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "11.272",
                height: "9.49",
                viewBox: "0 0 11.272 9.49",
                "data-supertokens": "arrowRightIcon",
            },
            {
                children: jsxRuntime.jsx("path", {
                    stroke: "#fff",
                    strokeWidth: "0.75px",
                    d: "M9.931 3.545h.016-7.041L5.12 1.33a.581.581 0 0 0 0-.817L4.775.168a.576.576 0 0 0-.813 0L.168 3.962a.58.58 0 0 0 0 .816l3.794 3.794a.577.577 0 0 0 .813 0l.344-.345a.57.57 0 0 0 .168-.407.553.553 0 0 0-.168-.4L2.881 5.191h7.058a.6.6 0 0 0 .584-.59v-.487a.585.585 0 0 0-.592-.569z",
                    transform: "rotate(180 5.449 4.558)",
                }),
            }
        )
    );
}

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
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            { xmlns: "http://www.w3.org/2000/svg", width: "59.867", height: "40.34", viewBox: "0 0 59.867 40.34" },
            {
                children: jsxRuntime.jsxs(
                    "g",
                    exports.__assign(
                        { id: "email", transform: "translate(0 -83.5)" },
                        {
                            children: [
                                jsxRuntime.jsx("path", {
                                    id: "Path_91396",
                                    d: "M470.393 98.615h-3.508v36.805h3.508a3.031 3.031 0 0 0 .89-2.15v-32.505a3.031 3.031 0 0 0-.89-2.15z",
                                    fill: "#8ae7ff",
                                    transform: "translate(-412.293 -13.348)",
                                }),
                                jsxRuntime.jsx("path", {
                                    id: "Path_91397",
                                    d: "M115.09 100.765a3.031 3.031 0 0 0-.89-2.15H68.39a3.031 3.031 0 0 0-.89 2.15v32.506a3.031 3.031 0 0 0 .89 2.15h45.81a3.031 3.031 0 0 0 .89-2.15z",
                                    fill: "#c4f3ff",
                                    transform: "translate(-59.607 -13.348)",
                                }),
                                jsxRuntime.jsx("path", {
                                    id: "Path_91398",
                                    fill: "#4fdbff",
                                    d: "M451.54 391l-3.04 3.508h3.508a3.031 3.031 0 0 0 2.15-.89z",
                                    transform: "translate(-396.058 -271.545)",
                                }),
                                jsxRuntime.jsx("path", {
                                    id: "Path_91399",
                                    d: "M121.814 225.009v-.468L99.773 202.5l-24.658 24.658a3.031 3.031 0 0 0 2.15.89h41.509a3.04 3.04 0 0 0 3.04-3.039z",
                                    fill: "#8ae7ff",
                                    transform: "translate(-66.332 -105.086)",
                                }),
                                jsxRuntime.jsx("path", {
                                    id: "Path_91400",
                                    d: "M452.008 91H448.5l3.04 3.508 2.617-2.617a3.031 3.031 0 0 0-2.149-.891z",
                                    fill: "#c4f3ff",
                                    transform: "translate(-396.058 -6.623)",
                                }),
                                jsxRuntime.jsx("path", {
                                    id: "Path_91401",
                                    fill: "#fff",
                                    d: "M118.774 91H77.265a3.031 3.031 0 0 0-2.15.89l20.318 20.318a6.139 6.139 0 0 0 8.681 0l17.7-17.7v-.468a3.04 3.04 0 0 0-3.04-3.04z",
                                    transform: "translate(-66.332 -6.623)",
                                }),
                                jsxRuntime.jsx("path", {
                                    id: "Path_91402",
                                    d: "M55.95 83.5H10.933a3.922 3.922 0 0 0-3.917 3.917v8.36H.877a.877.877 0 1 0 0 1.754H11.4a.877.877 0 1 0 0-1.754H8.77v-8.36a2.147 2.147 0 0 1 .147-.776l17.029 17.029-17.03 17.03a2.147 2.147 0 0 1-.147-.776v-5.729a.877.877 0 1 0-1.754 0v5.729a3.922 3.922 0 0 0 3.917 3.917H55.95a3.922 3.922 0 0 0 3.917-3.917V87.417A3.922 3.922 0 0 0 55.95 83.5zm-15.013 20.17l17.03-17.029a2.147 2.147 0 0 1 .147.776v32.506a2.147 2.147 0 0 1-.147.776zM55.95 85.254a2.147 2.147 0 0 1 .776.147l-19.564 19.564a5.267 5.267 0 0 1-7.441 0L10.156 85.4a2.147 2.147 0 0 1 .776-.147zm-45.017 36.832a2.147 2.147 0 0 1-.776-.146l17.029-17.03 1.295 1.295a7.024 7.024 0 0 0 9.922 0l1.297-1.295 17.027 17.03a2.147 2.147 0 0 1-.776.146z",
                                }),
                                jsxRuntime.jsx("path", {
                                    id: "Path_91403",
                                    d: "M7.893 218.5a.877.877 0 0 0-.877.877v2.631H.877a.877.877 0 0 0 0 1.754h14.031a.877.877 0 0 0 0-1.754H8.77v-2.631a.877.877 0 0 0-.877-.877z",
                                    transform: "translate(0 -119.215)",
                                }),
                                jsxRuntime.jsx("path", {
                                    id: "Path_91404",
                                    d: "M11.4 283.762a.877.877 0 0 0 0-1.754H8.77v-2.631a.877.877 0 1 0-1.754 0v2.631H.877a.877.877 0 0 0 0 1.754z",
                                    transform: "translate(0 -172.199)",
                                }),
                            ],
                        }
                    )
                ),
            }
        )
    );
}

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
function CheckedRoundIcon() {
    // TODO: fill&stroke color
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "33",
                height: "33",
                viewBox: "0 0 33 33",
                "data-supertokens": "checkedRoundIcon",
            },
            {
                children: jsxRuntime.jsxs("g", {
                    children: [
                        jsxRuntime.jsx("path", {
                            d: "M6.715 15.334a1.135 1.135 0 0 1 1.605-1.605l4.558 4.558 9.573-9.573a1.135 1.135 0 0 1 1.605 1.605L13.748 20.627a1.231 1.231 0 0 1-1.741 0z",
                            transform: "translate(-.5 -.5) translate(1.242 1.703)",
                        }),
                        jsxRuntime.jsx("path", {
                            fillRule: "evenodd",
                            d: "M17 1a16 16 0 1 0 16 16A16 16 0 0 0 17 1zM3.462 17A13.538 13.538 0 1 1 17 30.538 13.538 13.538 0 0 1 3.462 17z",
                            transform: "translate(-.5 -.5)",
                        }),
                    ],
                }),
            }
        )
    );
}

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
function ErrorLargeIcon() {
    // TODO: fill color
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "33",
                height: "30",
                viewBox: "0 0 33 30",
                "data-supertokens": "errorLargeIcon",
            },
            {
                children: jsxRuntime.jsxs("g", {
                    children: [
                        jsxRuntime.jsx("g", {
                            children: jsxRuntime.jsx("path", {
                                d: "M29.617 29.75H3.383c-.626 0-1.189-.321-1.507-.86-.318-.537-.328-1.186-.027-1.733l13.118-23.85c.312-.568.885-.907 1.533-.907.648 0 1.221.339 1.533.907l13.118 23.85c.301.547.291 1.196-.027 1.734s-.881.859-1.507.859z",
                                transform: "translate(-824.894 -352.483) translate(824.894 352.483)",
                            }),
                        }),
                        jsxRuntime.jsx(
                            "text",
                            exports.__assign(
                                {
                                    fill: "#fff",
                                    "font-family": "Rubik-Bold, Rubik",
                                    "font-size": "18px",
                                    fontWeight: "700",
                                    transform: "translate(-824.894 -352.483) translate(838.997 377.437)",
                                },
                                {
                                    children: jsxRuntime.jsx(
                                        "tspan",
                                        exports.__assign({ x: "0", y: "0" }, { children: "!" })
                                    ),
                                }
                            )
                        ),
                    ],
                }),
            }
        )
    );
}

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
function SpinnerIcon() {
    // TODO: stroke color
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            { version: "1.1", viewBox: "25 25 50 50", "data-supertokens": "spinnerIcon" },
            {
                children: jsxRuntime.jsxs(
                    "circle",
                    exports.__assign(
                        {
                            cx: "50",
                            cy: "50",
                            r: "20",
                            fill: "none",
                            strokeWidth: "5",
                            strokeLinecap: "round",
                            strokeDashoffset: "0",
                            strokeDasharray: "100, 200",
                        },
                        {
                            children: [
                                jsxRuntime.jsx("animateTransform", {
                                    attributeName: "transform",
                                    attributeType: "XML",
                                    type: "rotate",
                                    from: "0 50 50",
                                    to: "360 50 50",
                                    dur: "4s",
                                    repeatCount: "indefinite",
                                }),
                                jsxRuntime.jsx("animate", {
                                    attributeName: "stroke-dashoffset",
                                    values: "0;-30;-124",
                                    dur: "2s",
                                    repeatCount: "indefinite",
                                }),
                                jsxRuntime.jsx("animate", {
                                    attributeName: "stroke-dasharray",
                                    values: "0,200;110,200;110,200",
                                    dur: "2s",
                                    repeatCount: "indefinite",
                                }),
                            ],
                        }
                    )
                ),
            }
        )
    );
}

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
function ShowPasswordIcon(_a) {
    var showPassword = _a.showPassword;
    // TODO: primaryColor secondaryColor
    if (showPassword === true) {
        return jsxRuntime.jsx("div", {
            children: jsxRuntime.jsx(
                "svg",
                exports.__assign(
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "18.391",
                        height: "16.276",
                        viewBox: "0 0 18.391 16.276",
                        "data-supertokens": "showPasswordIcon show",
                    },
                    {
                        children: jsxRuntime.jsxs("g", {
                            children: [
                                jsxRuntime.jsx("g", {
                                    children: jsxRuntime.jsx("g", {
                                        children: jsxRuntime.jsx("g", {
                                            children: jsxRuntime.jsx("path", {
                                                d: "M29.289 100.33c-2.4-3.63-5.619-5.63-9.069-5.63s-6.67 2-9.069 5.63a.767.767 0 0 0 0 .845c2.4 3.63 5.619 5.63 9.069 5.63s6.67-2 9.069-5.63a.767.767 0 0 0 0-.845zm-9.069 4.944c-2.785 0-5.435-1.6-7.5-4.519 2.065-2.92 4.715-4.519 7.5-4.519s5.435 1.6 7.5 4.519c-2.064 2.92-4.711 4.519-7.5 4.519z",
                                                transform:
                                                    "translate(-822 -420.048) translate(822 422.035) translate(-11.025 -94.7)",
                                            }),
                                        }),
                                    }),
                                }),
                                jsxRuntime.jsxs(
                                    "g",
                                    exports.__assign(
                                        { transform: "translate(-822 -420.048) translate(827.164 424.055)" },
                                        {
                                            children: [
                                                jsxRuntime.jsx("circle", {
                                                    cx: "4.036",
                                                    cy: "4.036",
                                                    r: "4.036",
                                                    stroke: "none",
                                                }),
                                                jsxRuntime.jsx("circle", {
                                                    cx: "4.036",
                                                    cy: "4.036",
                                                    r: "3.536",
                                                    fill: "none",
                                                }),
                                            ],
                                        }
                                    )
                                ),
                                jsxRuntime.jsx("path", {
                                    fill: "none",
                                    stroke: "#707070",
                                    strokeLinecap: "round",
                                    strokeWidth: "2.25px",
                                    d: "M11.981 0L0 11.981",
                                    transform: "translate(-822 -420.048) translate(825.084 421.639)",
                                }),
                                jsxRuntime.jsx("path", {
                                    fill: "none",
                                    strokeLinecap: "round",
                                    d: "M13.978 0L0 13.978",
                                    transform: "translate(-822 -420.048) translate(825.084 421.639)",
                                }),
                            ],
                        }),
                    }
                )
            ),
        });
    }
    return jsxRuntime.jsx("div", {
        children: jsxRuntime.jsx(
            "svg",
            exports.__assign(
                {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "18.281",
                    height: "12.033",
                    viewBox: "0 0 18.281 12.033",
                    "data-supertokens": "showPasswordIcon hide",
                },
                {
                    children: jsxRuntime.jsxs("g", {
                        children: [
                            jsxRuntime.jsx("g", {
                                children: jsxRuntime.jsx("g", {
                                    children: jsxRuntime.jsx("g", {
                                        children: jsxRuntime.jsx("path", {
                                            d: "M29.18 100.3c-2.384-3.608-5.586-5.6-9.015-5.6s-6.63 1.989-9.015 5.6a.763.763 0 0 0 0 .84c2.384 3.608 5.586 5.6 9.015 5.6s6.63-1.989 9.015-5.6a.763.763 0 0 0 0-.84zm-9.015 4.914c-2.769 0-5.4-1.589-7.459-4.492 2.052-2.9 4.686-4.492 7.459-4.492s5.4 1.589 7.459 4.492c-2.056 2.899-4.686 4.489-7.458 4.489z",
                                            transform:
                                                "translate(-822 -422.088) translate(822 422.088) translate(-11.025 -94.7)",
                                        }),
                                    }),
                                }),
                            }),
                            jsxRuntime.jsxs(
                                "g",
                                exports.__assign(
                                    { transform: "translate(-822 -422.088) translate(827.133 424.096)" },
                                    {
                                        children: [
                                            jsxRuntime.jsx("circle", {
                                                cx: "4.012",
                                                cy: "4.012",
                                                r: "4.012",
                                                stroke: "none",
                                            }),
                                            jsxRuntime.jsx("circle", {
                                                cx: "4.012",
                                                cy: "4.012",
                                                r: "3.512",
                                                fill: "none",
                                            }),
                                        ],
                                    }
                                )
                            ),
                        ],
                    }),
                }
            )
        ),
    });
}

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
function CheckedIcon() {
    // TODO: fill color
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "14.862",
                height: "12.033",
                viewBox: "0 0 14.862 12.033",
                "data-supertokens": "checkedIcon",
            },
            {
                children: jsxRuntime.jsx("path", {
                    d: "M12.629 49L5.06 56.572l-2.829-2.829L0 55.977l5.057 5.057.654-.651 9.152-9.152z",
                    transform: "translate(0 -49)",
                }),
            }
        )
    );
}

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
function ErrorIcon() {
    // TODO: fill color
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "17",
                height: "15",
                viewBox: "0 0 17 15",
                "data-supertokens": "errorIcon",
            },
            {
                children: jsxRuntime.jsxs("g", {
                    children: [
                        jsxRuntime.jsx("g", {
                            children: jsxRuntime.jsx("path", {
                                d: "M13.568 14.75H3.432c-.63 0-1.195-.325-1.512-.869-.317-.544-.32-1.196-.01-1.744l5.067-8.943c.315-.556.884-.887 1.523-.887.639 0 1.208.331 1.523.887l5.067 8.943c.31.548.307 1.2-.01 1.744s-.882.869-1.512.869z",
                                transform: "translate(-824.894 -352.829) translate(824.894 352.829)",
                            }),
                        }),
                        jsxRuntime.jsx(
                            "text",
                            exports.__assign(
                                {
                                    fill: "#fff",
                                    fontSize: "10px",
                                    fontWeight: "700",
                                    transform: "translate(-824.894 -352.829) translate(832.014 365.198)",
                                },
                                {
                                    children: jsxRuntime.jsx(
                                        "tspan",
                                        exports.__assign({ x: "0", y: "0" }, { children: "!" })
                                    ),
                                }
                            )
                        ),
                    ],
                }),
            }
        )
    );
}

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
function ArrowLeftIcon() {
    // TODO: fill color
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "11.272",
                height: "9.49",
                viewBox: "0 0 11.272 9.49",
                "data-supertokens": "arrowLeftIcon",
            },
            {
                children: jsxRuntime.jsx("path", {
                    stroke: "#fff",
                    strokeWidth: "0.75px",
                    d: "M9.931 5.2h.016-7.041L5.12 7.41a.581.581 0 0 1 0 .817l-.344.345a.576.576 0 0 1-.813 0L.168 4.778a.58.58 0 0 1 0-.816L3.962.168a.577.577 0 0 1 .813 0l.345.344a.57.57 0 0 1 .168.407.553.553 0 0 1-.168.4l-2.239 2.23h7.058a.6.6 0 0 1 .584.59v.487a.585.585 0 0 1-.592.574z",
                    transform: "translate(.375 .375)",
                }),
            }
        )
    );
}

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
function HeavyArrowLeftIcon() {
    // TODO: fill color
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "13",
                viewBox: "0 0 16 13",
                "data-supertokens": "heavyArrowLeftIcon",
            },
            {
                children: jsxRuntime.jsx("path", {
                    d: "M13 6.8h.022H3.8l2.9 2.9a.761.761 0 0 1 0 1.07l-.451.451a.754.754 0 0 1-1.064 0L.22 6.254a.759.759 0 0 1 0-1.068L5.186.22a.755.755 0 0 1 1.064 0l.45.451a.746.746 0 0 1 .22.532.724.724 0 0 1-.22.522l-2.93 2.92h9.24a.781.781 0 0 1 .764.773v.638A.766.766 0 0 1 13 6.8z",
                    transform: "translate(1.182 .708)",
                }),
            }
        )
    );
}

/* Copyright (c) 2021, VRAI Labs and/or its affiliates. All rights reserved.
 *
 * This software is licensed under the Apache License, Version 2.0 (the
 * "License") as published by the Apache Software Foundation.
 *
 * You may not use this file except in compliance with the License. You may
 * obtain a copy of the License at http="//www.apache.org/licenses/LICENSE-2.0
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
function SMSLargeIcon() {
    return jsxRuntime.jsx(
        "svg",
        exports.__assign(
            { xmlns: "http://www.w3.org/2000/svg", width: "52.013", height: "41.889", viewBox: "0 0 52.013 41.889" },
            {
                children: jsxRuntime.jsx(
                    "g",
                    exports.__assign(
                        { id: "Group_10400", "data-name": "Group 10400", transform: "translate(-724.625 -241.125)" },
                        {
                            children: jsxRuntime.jsxs(
                                "g",
                                exports.__assign(
                                    { id: "Group_10399", "data-name": "Group 10399" },
                                    {
                                        children: [
                                            jsxRuntime.jsxs(
                                                "g",
                                                exports.__assign(
                                                    { id: "Group_10398", "data-name": "Group 10398" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsxs(
                                                                "g",
                                                                exports.__assign(
                                                                    {
                                                                        id: "_2639922_sms_icon",
                                                                        "data-name": "2639922_sms_icon",
                                                                        transform: "translate(732.916 242)",
                                                                    },
                                                                    {
                                                                        children: [
                                                                            jsxRuntime.jsx("path", {
                                                                                id: "Union_52",
                                                                                "data-name": "Union 52",
                                                                                d: "M7.124 37.96a6.26 6.26 0 0 0 3.652-5H6.593A6.592 6.592 0 0 1 0 26.367V6.592A6.592 6.592 0 0 1 6.593 0h29.664a6.592 6.592 0 0 1 6.593 6.592v19.775a6.592 6.592 0 0 1-6.593 6.592h-17.68a13.355 13.355 0 0 1-11.159 6.576zm20.893-21.48a3.3 3.3 0 1 0 3.3-3.3 3.3 3.3 0 0 0-3.3 3.3zm-9.887 0a3.3 3.3 0 1 0 3.3-3.3 3.295 3.295 0 0 0-3.3 3.3zm-9.888 0a3.3 3.3 0 1 0 3.3-3.3 3.3 3.3 0 0 0-3.301 3.3z",
                                                                                transform: "translate(-.001)",
                                                                                strokeWidth: "1.75px",
                                                                                stroke: "#000",
                                                                                fill: "#c4f3ff",
                                                                            }),
                                                                            jsxRuntime.jsx("ellipse", {
                                                                                id: "Ellipse_3013",
                                                                                "data-name": "Ellipse 3013",
                                                                                cy: ".917",
                                                                                ry: ".917",
                                                                                transform: "translate(7.335 38.506)",
                                                                                stroke: "#000",
                                                                                fill: "#c4f3ff",
                                                                            }),
                                                                        ],
                                                                    }
                                                                )
                                                            ),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Intersection_2",
                                                                "data-name": "Intersection 2",
                                                                fill: "#8ae7ff",
                                                                d: "M177.409-21836.576v-.33l-.214-1.131a6.271 6.271 0 0 0 3.651-5h-4.184a6.59 6.59 0 0 1-6.512-5.588h42.495a7.846 7.846 0 0 1-1.607 3.605 6.576 6.576 0 0 1-4.712 1.982h-14.845c-1.545-.09-2.537-.164-2.537-.164l-.077.164h-.219a13.342 13.342 0 0 1-11.156 6.572l-.082-.439z",
                                                                transform: "translate(562.766 22118)",
                                                            }),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Intersection_1",
                                                                "data-name": "Intersection 1",
                                                                fill: "#8ae7ff",
                                                                d: "M209.246-21846.41s.494-22.641 0-25.178a8.7 8.7 0 0 0-2.767-4.41 6.6 6.6 0 0 1 6.369 6.59v19.775a6.6 6.6 0 0 1-5.724 6.537 6.213 6.213 0 0 0 2.122-3.314z",
                                                                transform: "translate(561.882 22118.172)",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsxs(
                                                "g",
                                                exports.__assign(
                                                    {
                                                        id: "_2639922_sms_icon-2",
                                                        "data-name": "2639922_sms_icon",
                                                        transform: "translate(732.916 242.174)",
                                                    },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx("path", {
                                                                id: "Union_52-2",
                                                                "data-name": "Union 52",
                                                                d: "M7.124 37.96a6.26 6.26 0 0 0 3.652-5H6.593A6.592 6.592 0 0 1 0 26.367V6.592A6.592 6.592 0 0 1 6.593 0h29.664a6.592 6.592 0 0 1 6.593 6.592v19.775a6.592 6.592 0 0 1-6.593 6.592h-17.68a13.355 13.355 0 0 1-11.159 6.576zm20.893-21.48a3.3 3.3 0 1 0 3.3-3.3 3.3 3.3 0 0 0-3.3 3.3zm-9.887 0a3.3 3.3 0 1 0 3.3-3.3 3.295 3.295 0 0 0-3.3 3.3zm-9.888 0a3.3 3.3 0 1 0 3.3-3.3 3.3 3.3 0 0 0-3.301 3.3z",
                                                                transform: "translate(-.001)",
                                                                fill: "none",
                                                                strokeWidth: "1.75px",
                                                                stroke: "#000",
                                                            }),
                                                            jsxRuntime.jsx("ellipse", {
                                                                id: "Ellipse_3013-2",
                                                                "data-name": "Ellipse 3013",
                                                                cy: ".917",
                                                                ry: ".917",
                                                                transform: "translate(7.335 38.506)",
                                                                fill: "none",
                                                                stroke: "#000",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsxs(
                                                "g",
                                                exports.__assign(
                                                    { id: "Group_10397", "data-name": "Group 10397" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_104",
                                                                "data-name": "Line 104",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#000",
                                                                transform: "translate(725.5 266.84)",
                                                                d: "M0 0h9.872",
                                                            }),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_105",
                                                                "data-name": "Line 105",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#fff",
                                                                transform: "translate(725.5 268.59)",
                                                                d: "M0 0h9.872",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsxs(
                                                "g",
                                                exports.__assign(
                                                    { id: "Group_10396", "data-name": "Group 10396" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_103",
                                                                "data-name": "Line 103",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#000",
                                                                transform: "translate(725.5 260.17)",
                                                                d: "M0 0h12.461",
                                                            }),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_102",
                                                                "data-name": "Line 102",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#fff",
                                                                transform: "translate(725.5 261.92)",
                                                                d: "M0 0h12.461",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                            jsxRuntime.jsx("path", {
                                                id: "Path_91918",
                                                "data-name": "Path 91918",
                                                fill: "#8ae7ff",
                                                d: "M599.827 22145.373a1.62 1.62 0 0 0 1.38-1.336c.247-1.234.267 1.752.267 1.752l-1.647-.178z",
                                                transform: "translate(170 -21876)",
                                            }),
                                            jsxRuntime.jsxs(
                                                "g",
                                                exports.__assign(
                                                    { id: "Group_10395", "data-name": "Group 10395" },
                                                    {
                                                        children: [
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_100",
                                                                "data-name": "Line 100",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#000",
                                                                transform: "translate(725.5 253.5)",
                                                                d: "M0 0h9.872",
                                                            }),
                                                            jsxRuntime.jsx("path", {
                                                                id: "Line_101",
                                                                "data-name": "Line 101",
                                                                strokeWidth: "1.75px",
                                                                fill: "none",
                                                                strokeLinecap: "round",
                                                                stroke: "#fff",
                                                                transform: "translate(725.5 255.25)",
                                                                d: "M0 0h9.872",
                                                            }),
                                                        ],
                                                    }
                                                )
                                            ),
                                        ],
                                    }
                                )
                            ),
                        }
                    )
                ),
            }
        )
    );
}

exports.ArrowLeftIcon = ArrowLeftIcon;
exports.ArrowRightIcon = ArrowRightIcon;
exports.CheckedIcon = CheckedIcon;
exports.CheckedRoundIcon = CheckedRoundIcon;
exports.EmailLargeIcon = EmailLargeIcon;
exports.ErrorIcon = ErrorIcon;
exports.ErrorLargeIcon = ErrorLargeIcon;
exports.HeavyArrowLeftIcon = HeavyArrowLeftIcon;
exports.SMSLargeIcon = SMSLargeIcon;
exports.ShowPasswordIcon = ShowPasswordIcon;
exports.SpinnerIcon = SpinnerIcon;
exports.__awaiter = __awaiter;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__rest = __rest;
exports.__spreadArray = __spreadArray;
//# sourceMappingURL=assets.js.map
