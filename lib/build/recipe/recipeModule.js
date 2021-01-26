"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _httpRequest = _interopRequireDefault(require("../httpRequest"));

var _utils = require("../utils");

var _normalisedURLPath = _interopRequireDefault(require("../normalisedURLPath"));

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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/*
 * Class.
 */
var RecipeModule = /*#__PURE__*/ (function() {
    /*
     * Instance attributes.
     */

    /*
     * Constructor.
     */
    function RecipeModule(config) {
        var _this = this;

        _classCallCheck(this, RecipeModule);

        this.getRecipeId = function() {
            return _this.recipeId;
        };

        this.setSuccessRedirectTo = function(value) {
            try {
                _this.redirectTo = new _normalisedURLPath["default"](value);
            } catch (e) {}
        };

        this.getAppInfo = function() {
            return _this.appInfo;
        };

        this.getHttp = function() {
            return _this.httpRequest;
        };

        this.preAPIHook = /*#__PURE__*/ (function() {
            var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee(context) {
                    var preAPIHook;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    preAPIHook = _this.hooks.preAPIHook;

                                    if (!(preAPIHook !== undefined)) {
                                        _context.next = 5;
                                        break;
                                    }

                                    _context.next = 4;
                                    return preAPIHook(context);

                                case 4:
                                    return _context.abrupt("return", _context.sent);

                                case 5:
                                    return _context.abrupt("return", context.requestInit);

                                case 6:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee);
                })
            );

            return function(_x) {
                return _ref.apply(this, arguments);
            };
        })();

        this.redirect = /*#__PURE__*/ (function() {
            var _ref2 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(context, history) {
                    var redirectUrl;
                    return regeneratorRuntime.wrap(
                        function _callee2$(_context2) {
                            while (1) {
                                switch ((_context2.prev = _context2.next)) {
                                    case 0:
                                        _context2.next = 2;
                                        return _this.getRedirectionURL(context);

                                    case 2:
                                        redirectUrl = _context2.sent;
                                        _context2.prev = 3;
                                        new URL(redirectUrl); // Otherwise, If full URL, use redirectToWithReload

                                        _context2.next = 7;
                                        return (0, _utils.redirectToWithReload)(redirectUrl);

                                    case 7:
                                        return _context2.abrupt("return", _context2.sent);

                                    case 10:
                                        _context2.prev = 10;
                                        _context2.t0 = _context2["catch"](3);
                                        _context2.next = 14;
                                        return (0, _utils.redirectToInApp)(redirectUrl, history);

                                    case 14:
                                        return _context2.abrupt("return", _context2.sent);

                                    case 15:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        },
                        _callee2,
                        null,
                        [[3, 10]]
                    );
                })
            );

            return function(_x2, _x3) {
                return _ref2.apply(this, arguments);
            };
        })();

        this.getRedirectionURL = /*#__PURE__*/ (function() {
            var _ref3 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(context) {
                    var redirectUrl, getRedirectionURL;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch ((_context3.prev = _context3.next)) {
                                case 0:
                                    redirectUrl = _this.getSuccessRedirectionURL(context);

                                    if (!(redirectUrl !== undefined)) {
                                        _context3.next = 3;
                                        break;
                                    }

                                    return _context3.abrupt("return", redirectUrl);

                                case 3:
                                    // If getRedirectionURL provided by user.
                                    getRedirectionURL = _this.hooks.getRedirectionURL;

                                    if (!(getRedirectionURL !== undefined)) {
                                        _context3.next = 13;
                                        break;
                                    }

                                    _context3.next = 7;
                                    return getRedirectionURL(context);

                                case 7:
                                    _context3.t0 = _context3.sent;

                                    if (_context3.t0) {
                                        _context3.next = 10;
                                        break;
                                    }

                                    _context3.t0 = redirectUrl;

                                case 10:
                                    redirectUrl = _context3.t0;

                                    if (!(redirectUrl !== undefined)) {
                                        _context3.next = 13;
                                        break;
                                    }

                                    return _context3.abrupt("return", redirectUrl);

                                case 13:
                                    _context3.next = 15;
                                    return _this.getDefaultRedirectionURL(context);

                                case 15:
                                    return _context3.abrupt("return", _context3.sent);

                                case 16:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3);
                })
            );

            return function(_x4) {
                return _ref3.apply(this, arguments);
            };
        })();

        this.getSuccessRedirectionURL = function(context) {
            if (context.action !== "SUCCESS" || _this.redirectTo === undefined) {
                return;
            }

            var redirectTo = _this.redirectTo.getAsStringDangerous();

            _this.redirectTo = undefined; // Reset redirectToUrl.

            return redirectTo;
        };

        this.recipeId = config.recipeId;
        this.appInfo = config.appInfo;
        this.httpRequest = new _httpRequest["default"](this);
        this.hooks = {
            preAPIHook: config.preAPIHook,
            onHandleEvent: config.onHandleEvent,
            getRedirectionURL: config.getRedirectionURL
        };
    }
    /*
     * Instance Methods.
     */

    _createClass(RecipeModule, [
        {
            key: "onHandleEvent",
            value: function onHandleEvent(context) {
                var onHandleEvent = this.hooks.onHandleEvent;

                if (onHandleEvent !== undefined) {
                    onHandleEvent(context);
                }
            }
        },
        {
            key: "getDefaultRedirectionURL",
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            value: (function() {
                var _getDefaultRedirectionURL = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(context) {
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch ((_context4.prev = _context4.next)) {
                                    case 0:
                                        throw new Error("Recipe must overwrite getDefaultRedirectionURL");

                                    case 1:
                                    case "end":
                                        return _context4.stop();
                                }
                            }
                        }, _callee4);
                    })
                );

                function getDefaultRedirectionURL(_x5) {
                    return _getDefaultRedirectionURL.apply(this, arguments);
                }

                return getDefaultRedirectionURL;
            })()
        }
    ]);

    return RecipeModule;
})();

exports["default"] = RecipeModule;
