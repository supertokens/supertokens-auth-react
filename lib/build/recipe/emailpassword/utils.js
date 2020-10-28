"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultEmailValidator = defaultEmailValidator;
exports.defaultPasswordValidator = defaultPasswordValidator;

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
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            if (
                                !(
                                    value.match(
                                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    ) === null
                                )
                            ) {
                                _context.next = 2;
                                break;
                            }

                            return _context.abrupt("return", "Email is invalid");

                        case 2:
                            return _context.abrupt("return", undefined);

                        case 3:
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

function _defaultPasswordValidator() {
    _defaultPasswordValidator = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(value) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            if (!(value.length < 8)) {
                                _context2.next = 2;
                                break;
                            }

                            return _context2.abrupt(
                                "return",
                                "Password must contain at least 8 characters, including a number"
                            );

                        case 2:
                            if (!(value.length >= 100)) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.abrupt("return", "Password's length must be lesser than 100 characters");

                        case 4:
                            if (!(value.match(/^.*[A-Za-z]+.*$/) === null)) {
                                _context2.next = 6;
                                break;
                            }

                            return _context2.abrupt("return", "Password must contain at least one alphabet");

                        case 6:
                            if (!(value.match(/^.*[0-9]+.*$/) === null)) {
                                _context2.next = 8;
                                break;
                            }

                            return _context2.abrupt("return", "Password must contain at least one number");

                        case 8:
                            return _context2.abrupt("return", undefined);

                        case 9:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2);
        })
    );
    return _defaultPasswordValidator.apply(this, arguments);
}
