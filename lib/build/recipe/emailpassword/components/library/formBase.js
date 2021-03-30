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
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
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
                result.done
                    ? resolve(result.value)
                    : new P(function (resolve) {
                          resolve(result.value);
                      }).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
var __generator =
    (this && this.__generator) ||
    function (thisArg, body) {
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
                            if (
                                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                                (op[0] === 6 || op[0] === 2)
                            ) {
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
var react_2 = require("react");
var _1 = require(".");
var constants_1 = require("../../../../constants");
var constants_2 = require("../../constants");
var styleContext_1 = __importDefault(require("../../../../styles/styleContext"));
/*
 * Component.
 */
var FormBase = /** @class */ (function (_super) {
    __extends(FormBase, _super);
    /*
     * Constructor.
     */
    function FormBase(props) {
        var _this = _super.call(this, props) || this;
        /*
         * Methods.
         */
        _this.handleInputFocus = function (field) {
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.setState(function (oldState) {
                        return _this.getNewState(oldState.formFields, field, "focus", undefined);
                    });
                    return [2 /*return*/];
                });
            });
        };
        _this.handleInputBlur = function (field) {
            return __awaiter(_this, void 0, void 0, function () {
                var formFields, error, i;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formFields = this.state.formFields;
                            error = undefined;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < formFields.length)) return [3 /*break*/, 5];
                            if (!(field.id === formFields[i].id)) return [3 /*break*/, 4];
                            if (!(field.value !== "")) return [3 /*break*/, 3];
                            return [4 /*yield*/, formFields[i].validate(field.value)];
                        case 2:
                            error = _a.sent();
                            _a.label = 3;
                        case 3:
                            return [3 /*break*/, 5];
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5:
                            this.setState(function (oldState) {
                                // Do not update status asynchronously on blur if backend error already came in.
                                if (oldState.status === "GENERAL_ERROR") {
                                    return oldState;
                                }
                                return _this.getNewState(oldState.formFields, field, "blur", error);
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.onFormSubmit = function (e) {
            return __awaiter(_this, void 0, void 0, function () {
                var fields, result_1, errorFields_1, formFields_1, e_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Prevent default event propagation.
                            e.preventDefault();
                            // Set loading state.
                            this.setState(function (oldState) {
                                return __assign({}, oldState, { status: "LOADING" });
                            });
                            fields = this.state.formFields.map(function (field) {
                                return {
                                    id: field.id,
                                    value: field.ref.current !== null ? field.ref.current.value : "",
                                };
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.props.callAPI(fields)];
                        case 2:
                            result_1 = _a.sent();
                            // If successful
                            if (result_1.status === "OK") {
                                // Set Success state.
                                this.setState(
                                    function (oldState) {
                                        return __assign({}, oldState, { status: "SUCCESS" });
                                    },
                                    function () {
                                        if (_this.props.onSuccess !== undefined) {
                                            _this.props.onSuccess();
                                        }
                                    }
                                );
                                return [2 /*return*/];
                            }
                            // If field error.
                            if (result_1.status === "FIELD_ERROR") {
                                errorFields_1 = result_1.formFields;
                                formFields_1 = this.state.formFields.map(function (field) {
                                    for (var i = 0; i < errorFields_1.length; i++) {
                                        if (field.id === errorFields_1[i].id) {
                                            field.error = errorFields_1[i].error;
                                        }
                                    }
                                    return field;
                                });
                                this.setState(function () {
                                    return {
                                        status: "FIELD_ERRORS",
                                        formFields: formFields_1,
                                    };
                                });
                                return [2 /*return*/];
                            }
                            // Otherwise if message, set generalError
                            if (result_1.status === "GENERAL_ERROR") {
                                this.setState(function (oldState) {
                                    return __assign({}, oldState, {
                                        status: "GENERAL_ERROR",
                                        generalError: result_1.message,
                                    });
                                });
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            this.setState(function (oldState) {
                                return __assign({}, oldState, {
                                    status: "GENERAL_ERROR",
                                    generalError: constants_1.SOMETHING_WENT_WRONG_ERROR,
                                });
                            });
                            return [3 /*break*/, 4];
                        case 4:
                            return [2 /*return*/];
                    }
                });
            });
        };
        _this.state = {
            formFields: props.formFields.map(function (field) {
                return __assign({}, field, { validated: false, ref: react_2.createRef() });
            }),
            status: "IN_PROGRESS",
        };
        return _this;
    }
    FormBase.prototype.getNewState = function (formFields, field, event, error) {
        // Add error to formFields array for corresponding field.
        formFields = formFields.map(function (formField) {
            if (formField.id !== field.id) {
                return formField;
            }
            return __assign({}, formField, {
                validated: event === "blur" && error === undefined && field.value.length !== 0,
                error: error,
            });
        });
        var status = "READY";
        for (var i in formFields) {
            var field_1 = formFields[i];
            if (field_1.error !== undefined) {
                status = "FIELD_ERRORS";
                break;
            }
            if (field_1.optional === false) {
                var value = field_1.ref.current !== null ? field_1.ref.current.value : "";
                if (value.length === 0) {
                    var isFocused = field_1.ref.current !== null ? field_1.ref.current.isFocused : false;
                    if (isFocused !== true) {
                        status = "IN_PROGRESS";
                    }
                }
            }
        }
        return {
            status: status,
            formFields: formFields,
        };
    };
    /*
     * Render.
     */
    FormBase.prototype.render = function () {
        var _this = this;
        var styles = this.context;
        var _a = this.props,
            header = _a.header,
            footer = _a.footer,
            buttonLabel = _a.buttonLabel,
            showLabels = _a.showLabels,
            validateOnBlur = _a.validateOnBlur;
        var formFields = this.state.formFields;
        var onInputBlur = validateOnBlur === true ? this.handleInputBlur : undefined;
        return react_1.jsx(
            react_2.Fragment,
            null,
            header,
            this.state.status === "GENERAL_ERROR" &&
                react_1.jsx(
                    "div",
                    { "data-supertokens": "generalError", css: styles.generalError },
                    this.state.generalError
                ),
            react_1.jsx(
                "form",
                { autoComplete: "on", noValidate: true, onSubmit: this.onFormSubmit },
                formFields.map(function (field) {
                    var type = "text";
                    // If email or password, replace field type.
                    if (constants_2.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                        type = field.id;
                    }
                    if (field.id === "confirm-password") {
                        type = "password";
                    }
                    return react_1.jsx(
                        _1.FormRow,
                        { key: field.id, hasError: field.error !== undefined },
                        react_1.jsx(
                            react_2.Fragment,
                            null,
                            showLabels &&
                                react_1.jsx(_1.Label, { value: field.label, showIsRequired: field.showIsRequired }),
                            react_1.jsx(_1.Input, {
                                type: type,
                                name: field.id,
                                validated: field.validated,
                                placeholder: field.placeholder,
                                ref: field.ref,
                                autoComplete: field.autoComplete,
                                onInputFocus: _this.handleInputFocus,
                                onInputBlur: onInputBlur,
                                hasError: field.error !== undefined,
                            }),
                            field.error && react_1.jsx(_1.InputError, { error: field.error })
                        )
                    );
                }),
                react_1.jsx(
                    _1.FormRow,
                    { key: "form-button" },
                    react_1.jsx(
                        react_2.Fragment,
                        null,
                        react_1.jsx(_1.Button, {
                            disabled: this.state.status === "LOADING",
                            isLoading: this.state.status === "LOADING",
                            type: "submit",
                            label: buttonLabel,
                        }),
                        footer
                    )
                )
            )
        );
    };
    FormBase.contextType = styleContext_1.default;
    return FormBase;
})(react_2.PureComponent);
exports.default = FormBase;
//# sourceMappingURL=formBase.js.map
