"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signUpAPI = signUpAPI;
exports.signInAPI = signInAPI;
exports.emailExistsAPI = emailExistsAPI;

var _constants = require("../../../../../constants");

var _constants2 = require("../../../constants");

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
function signUpAPI(_x, _x2) {
    return _signUpAPI.apply(this, arguments);
}

function _signUpAPI() {
    _signUpAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(formFields, recipe) {
            var response;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            _context.next = 2;
                            return recipe.getHttp().post(
                                "/signup",
                                {
                                    body: JSON.stringify({
                                        formFields: formFields
                                    })
                                },
                                _constants2.EMAIL_PASSWORD_PRE_API_HOOK_ACTION.SIGN_UP
                            );

                        case 2:
                            response = _context.sent;

                            if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.OK,
                                user: response.user
                            });

                        case 5:
                            if (!(response.status === _constants2.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                _context.next = 7;
                                break;
                            }

                            return _context.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.FIELD_ERROR,
                                formFields: response.formFields
                            });

                        case 7:
                            throw new Error(_constants.SOMETHING_WENT_WRONG_ERROR);

                        case 8:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _signUpAPI.apply(this, arguments);
}

function signInAPI(_x3, _x4) {
    return _signInAPI.apply(this, arguments);
}

function _signInAPI() {
    _signInAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(formFields, recipe) {
            var response;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            _context2.next = 2;
                            return recipe.getHttp().post(
                                "/signin",
                                {
                                    body: JSON.stringify({
                                        formFields: formFields
                                    })
                                },
                                _constants2.EMAIL_PASSWORD_PRE_API_HOOK_ACTION.SIGN_IN
                            );

                        case 2:
                            response = _context2.sent;

                            if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                _context2.next = 5;
                                break;
                            }

                            return _context2.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.OK,
                                user: response.user
                            });

                        case 5:
                            if (!(response.status === _constants2.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                _context2.next = 7;
                                break;
                            }

                            return _context2.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.FIELD_ERROR,
                                formFields: response.formFields
                            });

                        case 7:
                            if (!(response.status === _constants2.API_RESPONSE_STATUS.WRONG_CREDENTIALS_ERROR)) {
                                _context2.next = 9;
                                break;
                            }

                            return _context2.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.GENERAL_ERROR,
                                message: _constants.INCORRECT_EMAIL_PASSWORD_COMBINATION_ERROR
                            });

                        case 9:
                            throw new Error(_constants.SOMETHING_WENT_WRONG_ERROR);

                        case 10:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2);
        })
    );
    return _signInAPI.apply(this, arguments);
}

function emailExistsAPI(_x5, _x6) {
    return _emailExistsAPI.apply(this, arguments);
}

function _emailExistsAPI() {
    _emailExistsAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(email, recipe) {
            var response;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch ((_context3.prev = _context3.next)) {
                        case 0:
                            _context3.next = 2;
                            return recipe
                                .getHttp()
                                .get(
                                    "/signup/email/exists",
                                    {},
                                    _constants2.EMAIL_PASSWORD_PRE_API_HOOK_ACTION.EMAIL_EXISTS,
                                    {
                                        email: email
                                    }
                                );

                        case 2:
                            response = _context3.sent;

                            if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                _context3.next = 7;
                                break;
                            }

                            if (!(response.exists === true)) {
                                _context3.next = 6;
                                break;
                            }

                            return _context3.abrupt("return", "This email already exists. Please sign in instead");

                        case 6:
                            return _context3.abrupt("return", undefined);

                        case 7:
                            return _context3.abrupt("return", undefined);

                        case 8:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3);
        })
    );
    return _emailExistsAPI.apply(this, arguments);
}
