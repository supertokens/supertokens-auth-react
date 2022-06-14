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
var emotion_1 = tslib_1.__importDefault(require("react-shadow/emotion"));
var constants_1 = require("../constants");
var errorBoundary_1 = tslib_1.__importDefault(require("./errorBoundary"));
var react_1 = require("@emotion/react");
var cache_1 = tslib_1.__importDefault(require("@emotion/cache"));
var superTokens_1 = tslib_1.__importDefault(require("../superTokens"));
var translationContext_1 = require("../translation/translationContext");
var utils_1 = require("../utils");
var superTokensEmotionCache = (0, cache_1.default)({
    key: "supertokens",
});
/*
 * Component.
 */
function FeatureWrapper(_a) {
    var children = _a.children,
        useShadowDom = _a.useShadowDom,
        defaultStore = _a.defaultStore;
    var st = superTokens_1.default.getInstanceOrThrow();
    return (0, jsx_runtime_1.jsx)(errorBoundary_1.default, {
        children: (0, jsx_runtime_1.jsx)(
            translationContext_1.TranslationContextProvider,
            tslib_1.__assign(
                {
                    defaultLanguage: st.languageTranslations.defaultLanguage,
                    defaultStore: (0, utils_1.mergeObjects)(defaultStore, st.languageTranslations.userTranslationStore),
                    translationControlEventSource: st.languageTranslations.translationEventSource,
                    userTranslationFunc: st.languageTranslations.userTranslationFunc,
                },
                {
                    children: (0, jsx_runtime_1.jsx)(
                        WithOrWithoutShadowDom,
                        tslib_1.__assign({ useShadowDom: useShadowDom }, { children: children })
                    ),
                }
            )
        ),
    });
}
exports.default = FeatureWrapper;
function WithOrWithoutShadowDom(_a) {
    var children = _a.children,
        useShadowDom = _a.useShadowDom;
    // If explicitely specified to not use shadow dom.
    if (useShadowDom === false) {
        return (0, jsx_runtime_1.jsxs)(
            "div",
            tslib_1.__assign(
                { id: constants_1.ST_ROOT_ID },
                {
                    children: [
                        (0, jsx_runtime_1.jsx)(
                            react_1.CacheProvider,
                            tslib_1.__assign({ value: superTokensEmotionCache }, { children: children })
                        ),
                        (0, jsx_runtime_1.jsx)(DisableAutoFillInput, {}),
                    ],
                }
            )
        );
    }
    // Otherwise, use shadow dom.
    return (0, jsx_runtime_1.jsxs)(
        emotion_1.default.div,
        tslib_1.__assign(
            { id: constants_1.ST_ROOT_ID },
            { children: [children, (0, jsx_runtime_1.jsx)(DisableAutoFillInput, {})] }
        )
    );
}
function DisableAutoFillInput() {
    /* eslint-disable react/jsx-no-literals */
    return (0, jsx_runtime_1.jsx)(
        "style",
        tslib_1.__assign(
            { type: "text/css" },
            {
                children:
                    "input.supertokens-input:-webkit-autofill,input.supertokens-input:-webkit-autofill:focus,input.supertokens-input:-webkit-autofill:hover,select:-webkit-autofill,select:-webkit-autofill:focus,select:-webkit-autofill:hover,textarea:-webkit-autofill,textarea:-webkit-autofill:focus,textarea:-webkit-autofill:hover{transition:background-color 5000s ease-in-out 0s}",
            }
        )
    );
    /* eslint-enable react/jsx-no-literals */
}
