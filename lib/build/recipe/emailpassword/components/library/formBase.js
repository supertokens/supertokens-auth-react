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
var __spreadArrays =
    (this && this.__spreadArrays) ||
    function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
        return r;
    };
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Imports.
 */
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("react");
var _1 = require(".");
var constants_1 = require("../../constants");
var react_3 = require("react");
var react_4 = require("react");
var react_5 = require("react");
exports.FormBase = function (props) {
    var footer = props.footer,
        buttonLabel = props.buttonLabel,
        showLabels = props.showLabels,
        validateOnBlur = props.validateOnBlur,
        formFields = props.formFields;
    var unmounting = react_4.useRef(new AbortController());
    react_5.useEffect(
        function () {
            // We need this because in some cases this gets called multiple times
            unmounting.current = new AbortController();
            return function () {
                unmounting.current.abort();
            };
        },
        [unmounting]
    );
    var _a = react_2.useState(
            props.formFields.map(function (f) {
                return { id: f.id, value: "" };
            })
        ),
        fieldStates = _a[0],
        setFieldStates = _a[1];
    var _b = react_2.useState(false),
        isLoading = _b[0],
        setIsLoading = _b[1];
    var updateFieldState = react_3.useCallback(
        function (id, update) {
            setFieldStates(function (os) {
                var field = os.find(function (f) {
                    return f.id === id;
                });
                if (field === undefined) {
                    return __spreadArrays(os, [update({ id: id, value: "" })]);
                }
                return os
                    .filter(function (f) {
                        return f !== field;
                    })
                    .concat(update(field));
            });
        },
        [setFieldStates]
    );
    var onInputFocus = react_3.useCallback(
        function (field) {
            updateFieldState(field.id, function (os) {
                return __assign(__assign({}, os), { validated: false });
            });
        },
        [updateFieldState]
    );
    var onInputBlur = react_3.useCallback(
        function (field) {
            return __awaiter(void 0, void 0, void 0, function () {
                var fieldConfig, error, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!validateOnBlur) {
                                return [2 /*return*/];
                            }
                            fieldConfig = props.formFields.find(function (f) {
                                return f.id === field.id;
                            });
                            if (!(fieldConfig && field.value !== "")) return [3 /*break*/, 2];
                            return [4 /*yield*/, fieldConfig.validate(field.value)];
                        case 1:
                            _a = _b.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _a = undefined;
                            _b.label = 3;
                        case 3:
                            error = _a;
                            updateFieldState(field.id, function (os) {
                                return __assign(__assign({}, os), {
                                    error: error,
                                    validated: error === undefined && field.value.length !== 0,
                                });
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        [validateOnBlur, updateFieldState, props.formFields]
    );
    var onInputChange = react_3.useCallback(
        function (field) {
            updateFieldState(field.id, function (os) {
                return __assign(__assign({}, os), { value: field.value, error: undefined });
            });
            props.clearError();
        },
        [updateFieldState]
    );
    var onFormSubmit = react_3.useCallback(
        function (e) {
            return __awaiter(void 0, void 0, void 0, function () {
                var apiFields, fieldUpdates_1, result, _loop_1, _i, formFields_1, field, errorFields_1, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Prevent default event propagation.
                            e.preventDefault();
                            // Set loading state.
                            setIsLoading(true);
                            setFieldStates(function (os) {
                                return os.map(function (fs) {
                                    return __assign(__assign({}, fs), { error: undefined });
                                });
                            });
                            apiFields = formFields.map(function (field) {
                                var fieldState = fieldStates.find(function (fs) {
                                    return fs.id === field.id;
                                });
                                return {
                                    id: field.id,
                                    value: fieldState === undefined ? "" : fieldState.value,
                                };
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            fieldUpdates_1 = [];
                            return [
                                4 /*yield*/,
                                props.callAPI(apiFields, function (id, value) {
                                    return fieldUpdates_1.push({ id: id, value: value });
                                }),
                            ];
                        case 2:
                            result = _a.sent();
                            if (unmounting.current.signal.aborted) {
                                return [2 /*return*/];
                            }
                            _loop_1 = function (field) {
                                var update = fieldUpdates_1.find(function (f) {
                                    return f.id === field.id;
                                });
                                if (update || field.clearOnSubmit === true) {
                                    // We can do these one by one, it's almost never more than one field
                                    updateFieldState(field.id, function (os) {
                                        return __assign(__assign({}, os), { value: update ? update.value : "" });
                                    });
                                }
                            };
                            for (_i = 0, formFields_1 = formFields; _i < formFields_1.length; _i++) {
                                field = formFields_1[_i];
                                _loop_1(field);
                            }
                            // If successful
                            if (result.status === "OK") {
                                setIsLoading(false);
                                props.clearError();
                                if (props.onSuccess !== undefined) {
                                    props.onSuccess(result);
                                }
                            }
                            // If field error.
                            if (result.status === "FIELD_ERROR") {
                                errorFields_1 = result.formFields;
                                setFieldStates(function (os) {
                                    return os.map(function (fs) {
                                        var _a;
                                        return __assign(__assign({}, fs), {
                                            error:
                                                (_a = errorFields_1.find(function (ef) {
                                                    return ef.id === fs.id;
                                                })) === null || _a === void 0
                                                    ? void 0
                                                    : _a.error,
                                        });
                                    });
                                });
                            }
                            // Otherwise if message, set generalError
                            if (result.status === "GENERAL_ERROR") {
                                props.onError(result.message);
                            }
                            return [3 /*break*/, 5];
                        case 3:
                            e_1 = _a.sent();
                            props.onError("SOMETHING_WENT_WRONG_ERROR");
                            return [3 /*break*/, 5];
                        case 4:
                            setIsLoading(false);
                            return [7 /*endfinally*/];
                        case 5:
                            return [2 /*return*/];
                    }
                });
            });
        },
        [setIsLoading, setFieldStates, props, formFields, fieldStates]
    );
    return react_1.jsx(
        "form",
        { autoComplete: "on", noValidate: true, onSubmit: onFormSubmit },
        formFields.map(function (field) {
            var type = "text";
            // If email or password, replace field type.
            if (constants_1.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(field.id)) {
                type = field.id;
            }
            if (field.id === "confirm-password") {
                type = "password";
            }
            var fstate = fieldStates.find(function (s) {
                return s.id === field.id;
            }) || {
                id: field.id,
                validated: false,
                error: undefined,
                value: "",
            };
            return react_1.jsx(
                _1.FormRow,
                { key: field.id, hasError: fstate.error !== undefined },
                react_1.jsx(
                    react_2.Fragment,
                    null,
                    showLabels &&
                        (field.labelComponent !== undefined
                            ? field.labelComponent
                            : react_1.jsx(_1.Label, { value: field.label, showIsRequired: field.showIsRequired })),
                    field.inputComponent !== undefined
                        ? react_1.jsx(field.inputComponent, {
                              type: type,
                              name: field.id,
                              validated: fstate.validated === true,
                              placeholder: field.placeholder,
                              value: fstate.value,
                              autoComplete: field.autoComplete,
                              autofocus: field.autofocus,
                              onInputFocus: onInputFocus,
                              onInputBlur: onInputBlur,
                              onChange: onInputChange,
                              hasError: fstate.error !== undefined,
                          })
                        : react_1.jsx(_1.Input, {
                              type: type,
                              name: field.id,
                              validated: fstate.validated === true,
                              placeholder: field.placeholder,
                              value: fstate.value,
                              autoComplete: field.autoComplete,
                              onInputFocus: onInputFocus,
                              onInputBlur: onInputBlur,
                              onChange: onInputChange,
                              autofocus: field.autofocus,
                              hasError: fstate.error !== undefined,
                          }),
                    fstate.error && react_1.jsx(_1.InputError, { error: fstate.error })
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
                    disabled: isLoading,
                    isLoading: isLoading,
                    type: "submit",
                    label: buttonLabel,
                }),
                footer
            )
        )
    );
};
exports.default = exports.FormBase;
