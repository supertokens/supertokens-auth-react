"use strict";
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
var react_2 = __importStar(require("react"));
var spinnerIcon_1 = __importDefault(require("../../../../../components/assets/spinnerIcon"));
var styleContext_1 = __importDefault(require("../../../../../styles/styleContext"));
var withOverride_1 = require("../../../../../components/componentOverride/withOverride");
var translationContext_1 = require("../../../../../translation/translationContext");
var library_1 = require("../../../../emailpassword/components/library");
var PasswordlessLinkClickedScreen = function (props) {
    var styles = react_2.useContext(styleContext_1.default);
    var t = translationContext_1.useTranslation();
    var _a = react_2.useState(false),
        loading = _a[0],
        setLoading = _a[1];
    return react_1.jsx(
        "div",
        { "data-supertokens": "container", css: styles.container },
        react_1.jsx(
            "div",
            { "data-supertokens": "row", css: styles.row },
            props.showButton === true
                ? react_1.jsx(
                      react_2.default.Fragment,
                      null,
                      react_1.jsx(
                          "div",
                          { "data-supertokens": "headerTitle", css: styles.headerTitle },
                          t("PWLESS_LINK_CLICKED_CONTINUE_HEADER")
                      ),
                      react_1.jsx(
                          "div",
                          {
                              "data-supertokens": "headerSubtitle secondaryText",
                              css: [styles.headerSubtitle, styles.secondaryText],
                          },
                          t("PWLESS_LINK_CLICKED_CONTINUE_DESC")
                      ),
                      react_1.jsx(
                          "div",
                          { "data-supertokens": "continueButtonWrapper", css: styles.continueButtonWrapper },
                          react_1.jsx(library_1.Button, {
                              isLoading: loading,
                              onClick: function () {
                                  setLoading(true);
                                  props.consumeCode();
                              },
                              type: "button",
                              label: "PWLESS_LINK_CLICKED_CONTINUE_BUTTON",
                          })
                      )
                  )
                : react_1.jsx(
                      "div",
                      { "data-supertokens": "spinner", css: styles.spinner },
                      react_1.jsx(spinnerIcon_1.default, { color: styles.palette.colors.primary })
                  )
        )
    );
};
exports.LinkClickedScreen = withOverride_1.withOverride("PasswordlessLinkClickedScreen", PasswordlessLinkClickedScreen);
