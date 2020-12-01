"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleSignUpAPI = handleSignUpAPI;
exports.handleSignInAPI = handleSignInAPI;
exports.handleEmailExistsAPICall = handleEmailExistsAPICall;

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

                                return _context.abrupt("return", response);

                            case 9:
                                console.error(
                                    "There was an error handling the output format of onCallSignUpAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks//sign-in-up#output"
                                );
                                return _context.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context["catch"](0);
                                return _context.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 16:
                            case "end":
                                return _context.stop();
                        }
                    }
                },
                _callee,
                null,
                [[0, 13]]
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

                                return _context2.abrupt("return", response);

                            case 11:
                                // Otherwise, something went wrong.
                                console.error(
                                    "There was an error handling the output format of onCallSignInAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks//sign-in-up#output-1"
                                );
                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 15:
                                _context2.prev = 15;
                                _context2.t0 = _context2["catch"](0);
                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 18:
                            case "end":
                                return _context2.stop();
                        }
                    }
                },
                _callee2,
                null,
                [[0, 15]]
            );
        })
    );
    return _handleSignInAPI.apply(this, arguments);
}

function handleEmailExistsAPICall(_x7, _x8, _x9) {
    return _handleEmailExistsAPICall.apply(this, arguments);
}

function _handleEmailExistsAPICall() {
    _handleEmailExistsAPICall = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(value, rid, onCallEmailExistsAPI) {
            var headers, response;
            return regeneratorRuntime.wrap(
                function _callee3$(_context3) {
                    while (1) {
                        switch ((_context3.prev = _context3.next)) {
                            case 0:
                                _context3.prev = 0;
                                headers = {
                                    rid: rid
                                };
                                _context3.next = 4;
                                return onCallEmailExistsAPI(value, headers);

                            case 4:
                                response = _context3.sent;

                                if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                    _context3.next = 9;
                                    break;
                                }

                                if (!(response.exists === true)) {
                                    _context3.next = 8;
                                    break;
                                }

                                return _context3.abrupt("return", "This email already exists. Please sign in instead");

                            case 8:
                                return _context3.abrupt("return", undefined);

                            case 9:
                                // Otherwise, something went wrong.
                                console.error(
                                    "There was an error handling the output format of onCallEmailExistsAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks//sign-in-up#output-1"
                                ); // Fail silently.

                                return _context3.abrupt("return", undefined);

                            case 13:
                                _context3.prev = 13;
                                _context3.t0 = _context3["catch"](0);
                                return _context3.abrupt("return", undefined);

                            case 16:
                            case "end":
                                return _context3.stop();
                        }
                    }
                },
                _callee3,
                null,
                [[0, 13]]
            );
        })
    );
    return _handleEmailExistsAPICall.apply(this, arguments);
}
