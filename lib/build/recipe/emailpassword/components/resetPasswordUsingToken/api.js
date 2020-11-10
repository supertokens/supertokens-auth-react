"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleSubmitNewPasswordAPI = handleSubmitNewPasswordAPI;
exports.handleEnterEmailAPI = handleEnterEmailAPI;

var _constants = require("../../../../constants");

var _constants2 = require("../../constants");

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
function handleSubmitNewPasswordAPI(_x, _x2, _x3, _x4) {
    return _handleSubmitNewPasswordAPI.apply(this, arguments);
}

function _handleSubmitNewPasswordAPI() {
    _handleSubmitNewPasswordAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(formFields, rid, submitNewPasswordAPI, token) {
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
                                return submitNewPasswordAPI(
                                    {
                                        formFields: formFields,
                                        token: token
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
                                if (
                                    !(
                                        response.status ===
                                        _constants2.API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR
                                    )
                                ) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.RESET_PASSWORD_INVALID_TOKEN_ERROR
                                });

                            case 9:
                                if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                    _context.next = 11;
                                    break;
                                }

                                return _context.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.OK
                                });

                            case 11:
                                console.error(
                                    "There was an error handling the output format of onCallSubmitNewPasswordAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks/reset-password#output"
                                );
                                return _context.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 15:
                                _context.prev = 15;
                                _context.t0 = _context["catch"](0);
                                return _context.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 18:
                            case "end":
                                return _context.stop();
                        }
                    }
                },
                _callee,
                null,
                [[0, 15]]
            );
        })
    );
    return _handleSubmitNewPasswordAPI.apply(this, arguments);
}

function handleEnterEmailAPI(_x5, _x6, _x7) {
    return _handleEnterEmailAPI.apply(this, arguments);
}

function _handleEnterEmailAPI() {
    _handleEnterEmailAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(formFields, rid, enterEmailAPI) {
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
                                return enterEmailAPI(
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
                                if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                    _context2.next = 9;
                                    break;
                                }

                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.OK
                                });

                            case 9:
                                console.error(
                                    "There was an error handling the output format of onCallSendResetEmailAPI props callback. Please refer to https://supertokens.io/docs/auth-react/emailpassword/callbacks/reset-password#output-1"
                                );
                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 13:
                                _context2.prev = 13;
                                _context2.t0 = _context2["catch"](0);
                                return _context2.abrupt("return", {
                                    status: _constants2.API_RESPONSE_STATUS.GENERAL_ERROR,
                                    message: _constants.SOMETHING_WENT_WRONG_ERROR
                                });

                            case 16:
                            case "end":
                                return _context2.stop();
                        }
                    }
                },
                _callee2,
                null,
                [[0, 13]]
            );
        })
    );
    return _handleEnterEmailAPI.apply(this, arguments);
}
