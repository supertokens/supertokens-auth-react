"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleSubmitNewPasswordAPI = handleSubmitNewPasswordAPI;
exports.enterEmailAPI = enterEmailAPI;

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
function handleSubmitNewPasswordAPI(_x, _x2, _x3) {
    return _handleSubmitNewPasswordAPI.apply(this, arguments);
}

function _handleSubmitNewPasswordAPI() {
    _handleSubmitNewPasswordAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(formFields, recipe, token) {
            var response;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            _context.next = 2;
                            return recipe.getHttp().post(
                                "/user/password/reset",
                                {
                                    body: JSON.stringify({
                                        formFields: formFields,
                                        token: token
                                    })
                                },
                                _constants2.EMAIL_PASSWORD_PRE_API_HOOK_ACTION.SUBMIT_NEW_PASSWORD
                            );

                        case 2:
                            response = _context.sent;

                            if (!(response.status === _constants2.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                _context.next = 5;
                                break;
                            }

                            return _context.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.FIELD_ERROR,
                                formFields: response.formFields
                            });

                        case 5:
                            if (
                                !(
                                    response.status ===
                                    _constants2.API_RESPONSE_STATUS.RESET_PASSWORD_INVALID_TOKEN_ERROR
                                )
                            ) {
                                _context.next = 7;
                                break;
                            }

                            return _context.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.GENERAL_ERROR,
                                message: _constants.RESET_PASSWORD_INVALID_TOKEN_ERROR
                            });

                        case 7:
                            if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                _context.next = 9;
                                break;
                            }

                            return _context.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.OK
                            });

                        case 9:
                            throw Error(_constants.SOMETHING_WENT_WRONG_ERROR);

                        case 10:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _handleSubmitNewPasswordAPI.apply(this, arguments);
}

function enterEmailAPI(_x4, _x5) {
    return _enterEmailAPI.apply(this, arguments);
}

function _enterEmailAPI() {
    _enterEmailAPI = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(formFields, recipe) {
            var response;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            _context2.next = 2;
                            return recipe.getHttp().post(
                                "/user/password/reset/token",
                                {
                                    body: JSON.stringify({
                                        formFields: formFields
                                    })
                                },
                                _constants2.EMAIL_PASSWORD_PRE_API_HOOK_ACTION.SEND_RESET_PASSWORD_EMAIL
                            );

                        case 2:
                            response = _context2.sent;

                            if (!(response.status === _constants2.API_RESPONSE_STATUS.FIELD_ERROR)) {
                                _context2.next = 5;
                                break;
                            }

                            return _context2.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.FIELD_ERROR,
                                formFields: response.formFields
                            });

                        case 5:
                            if (!(response.status === _constants2.API_RESPONSE_STATUS.OK)) {
                                _context2.next = 7;
                                break;
                            }

                            return _context2.abrupt("return", {
                                status: _constants2.FORM_BASE_API_RESPONSE.OK
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
    return _enterEmailAPI.apply(this, arguments);
}
