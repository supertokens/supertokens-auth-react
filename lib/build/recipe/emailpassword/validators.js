"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultEmailValidator = defaultEmailValidator;
exports.defaultPasswordValidator = defaultPasswordValidator;
exports.defaultLoginPasswordValidator = defaultLoginPasswordValidator;
exports.defaultValidate = defaultValidate;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function() {
        var self = this,
            args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

/* Copyright (c) 2020, VRAI Labs and/or its affiliates. All rights reserved.
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
 * defaultEmailValidator.
 */
function defaultEmailValidator(_x) {
    return _defaultEmailValidator.apply(this, arguments);
}
/*
 * defaultPasswordValidator.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */

function _defaultEmailValidator() {
    _defaultEmailValidator = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(value) {
            var defaultEmailValidatorRegexp;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            if (!(typeof value !== "string")) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt("return", "Email must be of type string");

                        case 2:
                            // eslint-disable-next-line no-useless-escape
                            defaultEmailValidatorRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // We check if the email syntax is correct
                            // As per https://github.com/supertokens/supertokens-auth-react/issues/5#issuecomment-709512438
                            // Regex from https://stackoverflow.com/a/46181/3867175

                            if (!(value.match(defaultEmailValidatorRegexp) === null)) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt("return", "Email is invalid");

                        case 5:
                            return _context.abrupt("return", undefined);

                        case 6:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _defaultEmailValidator.apply(this, arguments);
}

function defaultPasswordValidator(_x2) {
    return _defaultPasswordValidator.apply(this, arguments);
}
/*
 * defaultLoginPasswordValidator.
 * type string
 */

function _defaultPasswordValidator() {
    _defaultPasswordValidator = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(value) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            if (!(typeof value !== "string")) {
                                _context2.next = 2;
                                break;
                            }

                            return _context2.abrupt("return", "Password must be of type string");

                        case 2:
                            if (!(value.length < 8)) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.abrupt(
                                "return",
                                "Password must contain at least 8 characters, including a number"
                            );

                        case 4:
                            if (!(value.length >= 100)) {
                                _context2.next = 6;
                                break;
                            }

                            return _context2.abrupt("return", "Password's length must be lesser than 100 characters");

                        case 6:
                            if (!(value.match(/^.*[A-Za-z]+.*$/) === null)) {
                                _context2.next = 8;
                                break;
                            }

                            return _context2.abrupt("return", "Password must contain at least one alphabet");

                        case 8:
                            if (!(value.match(/^.*[0-9]+.*$/) === null)) {
                                _context2.next = 10;
                                break;
                            }

                            return _context2.abrupt("return", "Password must contain at least one number");

                        case 10:
                            return _context2.abrupt("return", undefined);

                        case 11:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2);
        })
    );
    return _defaultPasswordValidator.apply(this, arguments);
}

function defaultLoginPasswordValidator(_x3) {
    return _defaultLoginPasswordValidator.apply(this, arguments);
}
/*
 * defaultValidate
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

function _defaultLoginPasswordValidator() {
    _defaultLoginPasswordValidator = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(value) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch ((_context3.prev = _context3.next)) {
                        case 0:
                            if (!(typeof value !== "string")) {
                                _context3.next = 2;
                                break;
                            }

                            return _context3.abrupt("return", "Password must be of type string");

                        case 2:
                            return _context3.abrupt("return", undefined);

                        case 3:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3);
        })
    );
    return _defaultLoginPasswordValidator.apply(this, arguments);
}

function defaultValidate(_x4) {
    return _defaultValidate.apply(this, arguments);
}

function _defaultValidate() {
    _defaultValidate = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(_) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch ((_context4.prev = _context4.next)) {
                        case 0:
                            return _context4.abrupt("return", undefined);

                        case 1:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4);
        })
    );
    return _defaultValidate.apply(this, arguments);
}
