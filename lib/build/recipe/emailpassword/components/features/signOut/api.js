"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signOut = signOut;

var _constants = require("../../../../../constants");

var _constants2 = require("../../../constants");

var _fetch = _interopRequireDefault(require("supertokens-website/lib/build/fetch"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
function signOut(_x) {
    return _signOut.apply(this, arguments);
}

function _signOut() {
    _signOut = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(recipe) {
            var sessionExpiredStatusCode, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            sessionExpiredStatusCode = _fetch["default"].sessionExpiredStatusCode;
                            _context.next = 3;
                            return recipe.getHttp().fetch(
                                recipe.getHttp().getFullUrl("/signout"),
                                {
                                    method: "POST"
                                },
                                _constants2.EMAIL_PASSWORD_PRE_API_HOOK_ACTION.SIGN_OUT
                            );

                        case 3:
                            result = _context.sent;

                            if (!(result.status === sessionExpiredStatusCode)) {
                                _context.next = 6;
                                break;
                            }

                            return _context.abrupt("return", {
                                status: _constants2.API_RESPONSE_STATUS.OK
                            });

                        case 6:
                            if (!(result.status >= 300)) {
                                _context.next = 8;
                                break;
                            }

                            throw Error(_constants.SOMETHING_WENT_WRONG_ERROR);

                        case 8:
                            _context.next = 10;
                            return result.json();

                        case 10:
                            return _context.abrupt("return", _context.sent);

                        case 11:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _signOut.apply(this, arguments);
}
