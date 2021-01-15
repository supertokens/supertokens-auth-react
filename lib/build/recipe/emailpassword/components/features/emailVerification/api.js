"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyEmailAPI = verifyEmailAPI;
exports.sendVerifyEmailAPI = sendVerifyEmailAPI;
exports.isEmailVerifiedAPI = isEmailVerifiedAPI;

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
 * Imports.
 */
function verifyEmailAPI(_x, _x2) {
    return _verifyEmailAPI.apply(this, arguments);
}

function _verifyEmailAPI() {
    _verifyEmailAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(recipe, token) {
            var response;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            _context.next = 2;
                            return recipe.getHttp().post(
                                "/user/email/verify",
                                {
                                    body: JSON.stringify({
                                        method: "token",
                                        token: token
                                    })
                                },
                                _constants2.EMAIL_PASSWORD_PRE_API_HOOK_ACTION.VERIFY_EMAIL
                            );

                        case 2:
                            response = _context.sent;

                            if (
                                !(
                                    response.status ===
                                    _constants2.API_RESPONSE_STATUS.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR
                                )
                            ) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt("return", {
                                status: _constants2.VERIFY_EMAIL_LINK_CLICKED_STATUS.INVALID
                            });

                        case 5:
                            if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                _context.next = 7;
                                break;
                            }

                            return _context.abrupt("return", {
                                status: _constants2.VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL
                            });

                        case 7:
                            throw Error(_constants.SOMETHING_WENT_WRONG_ERROR);

                        case 8:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _verifyEmailAPI.apply(this, arguments);
}

function sendVerifyEmailAPI(_x3) {
    return _sendVerifyEmailAPI.apply(this, arguments);
}

function _sendVerifyEmailAPI() {
    _sendVerifyEmailAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(recipe) {
            var response;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            _context2.next = 2;
                            return recipe
                                .getHttp()
                                .post(
                                    "/user/email/verify/token",
                                    {},
                                    _constants2.EMAIL_PASSWORD_PRE_API_HOOK_ACTION.SEND_VERIFY_EMAIL
                                );

                        case 2:
                            response = _context2.sent;

                            if (!(response.status === _constants2.API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR)) {
                                _context2.next = 5;
                                break;
                            }

                            return _context2.abrupt("return", {
                                status: _constants2.API_RESPONSE_STATUS.EMAIL_ALREADY_VERIFIED_ERROR
                            });

                        case 5:
                            if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                _context2.next = 7;
                                break;
                            }

                            return _context2.abrupt("return", {
                                status: _constants2.API_RESPONSE_STATUS.OK
                            });

                        case 7:
                            throw Error(_constants.SOMETHING_WENT_WRONG_ERROR);

                        case 8:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2);
        })
    );
    return _sendVerifyEmailAPI.apply(this, arguments);
}

function isEmailVerifiedAPI(_x4) {
    return _isEmailVerifiedAPI.apply(this, arguments);
}

function _isEmailVerifiedAPI() {
    _isEmailVerifiedAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(recipe) {
            var response;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch ((_context3.prev = _context3.next)) {
                        case 0:
                            _context3.next = 2;
                            return recipe
                                .getHttp()
                                .get(
                                    "/user/email/verify",
                                    {},
                                    _constants2.EMAIL_PASSWORD_PRE_API_HOOK_ACTION.IS_EMAIL_VERIFIED
                                );

                        case 2:
                            response = _context3.sent;
                            return _context3.abrupt("return", response.isVerified);

                        case 4:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3);
        })
    );
    return _isEmailVerifiedAPI.apply(this, arguments);
}
