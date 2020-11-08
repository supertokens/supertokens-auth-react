"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleSignUpAPI = handleSignUpAPI;
exports.handleSignInAPI = handleSignInAPI;

var _constants = require("../../../../constants");

var _constants2 = require("../../constants");

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }
    return obj;
}

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

/*
 * Methods.
 */
function handleSignUpAPI(_x, _x2, _x3) {
    return _handleSignUpAPI.apply(this, arguments);
}

function _handleSignUpAPI() {
    _handleSignUpAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(formFields, rid, signUpAPI) {
            var headers, response;
            return regeneratorRuntime.wrap(
                function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                _context.prev = 0;
                                headers = {
                                    rid: rid
                                };
                                _context.next = 4;
                                return signUpAPI(
                                    {
                                        formFields: formFields
                                    },
                                    headers
                                );

                            case 4:
                                response = _context.sent;

                                if (!(response.status === _constants2.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.FIELD_ERROR,
                                    formFields: response.formFields
                                });

                            case 7:
                                if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt("return", _objectSpread({}, response));

                            case 9:
                                return _context.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context["catch"](0);
                                return _context.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 15:
                            case "end":
                                return _context.stop();
                        }
                    }
                },
                _callee,
                null,
                [[0, 12]]
            );
        })
    );
    return _handleSignUpAPI.apply(this, arguments);
}

function handleSignInAPI(_x4, _x5, _x6) {
    return _handleSignInAPI.apply(this, arguments);
}

function _handleSignInAPI() {
    _handleSignInAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(formFields, rid, signInAPI) {
            var headers, response;
            return regeneratorRuntime.wrap(
                function _callee2$(_context2) {
                    while (1) {
                        switch ((_context2.prev = _context2.next)) {
                            case 0:
                                _context2.prev = 0;
                                headers = {
                                    rid: rid
                                };
                                _context2.next = 4;
                                return signInAPI(
                                    {
                                        formFields: formFields
                                    },
                                    headers
                                );

                            case 4:
                                response = _context2.sent;

                                if (!(response.status === _constants2.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                    _context2.next = 7;
                                    break;
                                }

                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.FIELD_ERROR,
                                    formFields: response.formFields
                                });

                            case 7:
                                if (!(response.status === _constants2.API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR)) {
                                    _context2.next = 9;
                                    break;
                                }

                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR,
                                    message: _constants.INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR
                                });

                            case 9:
                                if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                    _context2.next = 11;
                                    break;
                                }

                                return _context2.abrupt("return", _objectSpread({}, response));

                            case 11:
                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 14:
                                _context2.prev = 14;
                                _context2.t0 = _context2["catch"](0);
                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 17:
                            case "end":
                                return _context2.stop();
                        }
                    }
                },
                _callee2,
                null,
                [[0, 14]]
            );
        })
    );
    return _handleSignInAPI.apply(this, arguments);
}
