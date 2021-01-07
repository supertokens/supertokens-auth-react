"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleVerifyEmailAPI = handleVerifyEmailAPI;
exports.handleSendVerifyEmailAPI = handleSendVerifyEmailAPI;

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
function handleVerifyEmailAPI(_x, _x2, _x3) {
    return _handleVerifyEmailAPI.apply(this, arguments);
}

function _handleVerifyEmailAPI() {
    _handleVerifyEmailAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(rid, verifyEmailAPI, token) {
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
                                return verifyEmailAPI(
                                    {
                                        method: "token",
                                        token: token
                                    },
                                    headers
                                );

                            case 4:
                                response = _context.sent;

                                if (
                                    !(
                                        response.status ===
                                        _constants2.API_RESPONSE_STATUS.EMAIL_VERIFICATION_INVALID_TOKEN_ERROR
                                    )
                                ) {
                                    _context.next = 7;
                                    break;
                                }

                                return _context.abrupt("return", {
                                    status: _constants2.VERIFY_EMAIL_LINK_CLICKED_STATUS.INVALID
                                });

                            case 7:
                                if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt("return", {
                                    status: _constants2.VERIFY_EMAIL_LINK_CLICKED_STATUS.SUCCESSFUL
                                });

                            case 9:
                                console.error(
                                    "There was an error handling the output format of onVerifyEmailAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks/email-verification#output"
                                );
                                return _context.abrupt("return", {
                                    status: _constants2.VERIFY_EMAIL_LINK_CLICKED_STATUS.GENERAL_ERROR
                                });

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context["catch"](0);
                                return _context.abrupt("return", {
                                    status: _constants2.VERIFY_EMAIL_LINK_CLICKED_STATUS.GENERAL_ERROR
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
    return _handleVerifyEmailAPI.apply(this, arguments);
}

function handleSendVerifyEmailAPI(_x4, _x5) {
    return _handleSendVerifyEmailAPI.apply(this, arguments);
}

function _handleSendVerifyEmailAPI() {
    _handleSendVerifyEmailAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(rid, sendVerifyEmailAPI) {
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
                                return sendVerifyEmailAPI(headers);

                            case 4:
                                response = _context2.sent;

                                if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                    _context2.next = 7;
                                    break;
                                }

                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.OK
                                });

                            case 7:
                                console.error(
                                    "There was an error handling the output format of onCallSendVerifyEmailAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks/email-verification#output-1"
                                );
                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 11:
                                _context2.prev = 11;
                                _context2.t0 = _context2["catch"](0);
                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 14:
                            case "end":
                                return _context2.stop();
                        }
                    }
                },
                _callee2,
                null,
                [[0, 11]]
            );
        })
    );
    return _handleSendVerifyEmailAPI.apply(this, arguments);
}
