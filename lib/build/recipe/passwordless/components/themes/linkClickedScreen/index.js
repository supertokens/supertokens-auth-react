"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkClickedScreen = void 0;
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
var react_1 = tslib_1.__importStar(require("react"));
var spinnerIcon_1 = tslib_1.__importDefault(require("../../../../../components/assets/spinnerIcon"));
var styleContext_1 = tslib_1.__importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var library_1 = require("../../../../emailpassword/components/library");
var PasswordlessLinkClickedScreen = function (props) {
    var styles = (0, react_1.useContext)(styleContext_1.default);
    var t = (0, translationContext_1.useTranslation)();
    var _a = (0, react_1.useState)(false),
        loading = _a[0],
        setLoading = _a[1];
    return (0, jsx_runtime_1.jsx)(
        "div",
        tslib_1.__assign(
            { "data-supertokens": "container", css: styles.container },
            {
                children: (0, jsx_runtime_1.jsx)(
                    "div",
                    tslib_1.__assign(
                        { "data-supertokens": "row", css: styles.row },
                        {
                            children:
                                props.requireUserInteraction === true
                                    ? (0, jsx_runtime_1.jsxs)(react_1.default.Fragment, {
                                          children: [
                                              (0, jsx_runtime_1.jsx)(
                                                  "div",
                                                  tslib_1.__assign(
                                                      { "data-supertokens": "headerTitle", css: styles.headerTitle },
                                                      { children: t("PWLESS_LINK_CLICKED_CONTINUE_HEADER") }
                                                  )
                                              ),
                                              (0, jsx_runtime_1.jsx)(
                                                  "div",
                                                  tslib_1.__assign(
                                                      {
                                                          "data-supertokens": "headerSubtitle secondaryText",
                                                          css: [styles.headerSubtitle, styles.secondaryText],
                                                      },
                                                      { children: t("PWLESS_LINK_CLICKED_CONTINUE_DESC") }
                                                  )
                                              ),
                                              (0, jsx_runtime_1.jsx)(
                                                  "div",
                                                  tslib_1.__assign(
                                                      {
                                                          "data-supertokens": "continueButtonWrapper",
                                                          css: styles.continueButtonWrapper,
                                                      },
                                                      {
                                                          children: (0, jsx_runtime_1.jsx)(library_1.Button, {
                                                              isLoading: loading,
                                                              onClick: function () {
                                                                  setLoading(true);
                                                                  props.consumeCode();
                                                              },
                                                              type: "button",
                                                              label: "PWLESS_LINK_CLICKED_CONTINUE_BUTTON",
                                                          }),
                                                      }
                                                  )
                                              ),
                                          ],
                                      })
                                    : (0, jsx_runtime_1.jsx)(
                                          "div",
                                          tslib_1.__assign(
                                              { "data-supertokens": "spinner", css: styles.spinner },
                                              {
                                                  children: (0, jsx_runtime_1.jsx)(spinnerIcon_1.default, {
                                                      color: styles.palette.colors.primary,
                                                  }),
                                              }
                                          )
                                      ),
                        }
                    )
                ),
            }
        )
    );
};
exports.LinkClickedScreen = (0, withOverride_1.withOverride)(
    "PasswordlessLinkClickedScreen",
    PasswordlessLinkClickedScreen
);
