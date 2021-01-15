"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _constants = require("./constants");

var _normalisedURLPath = _interopRequireDefault(require("./normalisedURLPath"));

var _version = require("./version");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var HttpRequest =
    /*
     * Instance Attributes.
     */

    /*
     * Constructor.
     */
    function HttpRequest(recipe) {
        var _this = this;

        _classCallCheck(this, HttpRequest);

        this.get = /*#__PURE__*/ (function() {
            var _ref = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee(path, config, action, queryParams) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch ((_context.prev = _context.next)) {
                                case 0:
                                    _context.next = 2;
                                    return _this.fetchResponseJsonOrThrowAbove300(
                                        _this.getFullUrl(path, queryParams),
                                        _objectSpread(
                                            {
                                                method: "GET"
                                            },
                                            config
                                        ),
                                        action
                                    );

                                case 2:
                                    return _context.abrupt("return", _context.sent);

                                case 3:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee);
                })
            );

            return function(_x, _x2, _x3, _x4) {
                return _ref.apply(this, arguments);
            };
        })();

        this.post = /*#__PURE__*/ (function() {
            var _ref2 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(path, config, action) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch ((_context2.prev = _context2.next)) {
                                case 0:
                                    _context2.next = 2;
                                    return _this.fetchResponseJsonOrThrowAbove300(
                                        _this.getFullUrl(path),
                                        _objectSpread(
                                            {
                                                method: "POST"
                                            },
                                            config
                                        ),
                                        action
                                    );

                                case 2:
                                    return _context2.abrupt("return", _context2.sent);

                                case 3:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2);
                })
            );

            return function(_x5, _x6, _x7) {
                return _ref2.apply(this, arguments);
            };
        })();

        this["delete"] = /*#__PURE__*/ (function() {
            var _ref3 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee3(path, action, config) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch ((_context3.prev = _context3.next)) {
                                case 0:
                                    _context3.next = 2;
                                    return _this.fetchResponseJsonOrThrowAbove300(
                                        _this.getFullUrl(path),
                                        _objectSpread(
                                            {
                                                method: "DELETE"
                                            },
                                            config
                                        ),
                                        action
                                    );

                                case 2:
                                    return _context3.abrupt("return", _context3.sent);

                                case 3:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3);
                })
            );

            return function(_x8, _x9, _x10) {
                return _ref3.apply(this, arguments);
            };
        })();

        this.put = /*#__PURE__*/ (function() {
            var _ref4 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee4(path, action, config) {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch ((_context4.prev = _context4.next)) {
                                case 0:
                                    _context4.next = 2;
                                    return _this.fetchResponseJsonOrThrowAbove300(
                                        _this.getFullUrl(path),
                                        _objectSpread(
                                            {
                                                method: "PUT"
                                            },
                                            config
                                        ),
                                        action
                                    );

                                case 2:
                                    return _context4.abrupt("return", _context4.sent);

                                case 3:
                                case "end":
                                    return _context4.stop();
                            }
                        }
                    }, _callee4);
                })
            );

            return function(_x11, _x12, _x13) {
                return _ref4.apply(this, arguments);
            };
        })();

        this.fetch = /*#__PURE__*/ (function() {
            var _ref5 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee5(url, config, action) {
                    var headers, requestInit;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch ((_context5.prev = _context5.next)) {
                                case 0:
                                    if (config === undefined) {
                                        headers = {};
                                    } else {
                                        headers = config.headers;
                                    }

                                    _context5.next = 3;
                                    return _this.recipe.preAPIHook({
                                        action: action,
                                        requestInit: _objectSpread(
                                            _objectSpread({}, config),
                                            {},
                                            {
                                                headers: _objectSpread(
                                                    _objectSpread({}, headers),
                                                    {},
                                                    {
                                                        "fdi-version": _version.supported_fdi.join(","),
                                                        "Content-Type": "application/json",
                                                        rid: _this.recipe.getRecipeId()
                                                    }
                                                )
                                            }
                                        )
                                    });

                                case 3:
                                    requestInit = _context5.sent;
                                    _context5.next = 6;
                                    return fetch(url, requestInit);

                                case 6:
                                    return _context5.abrupt("return", _context5.sent);

                                case 7:
                                case "end":
                                    return _context5.stop();
                            }
                        }
                    }, _callee5);
                })
            );

            return function(_x14, _x15, _x16) {
                return _ref5.apply(this, arguments);
            };
        })();

        this.fetchResponseJsonOrThrowAbove300 = /*#__PURE__*/ (function() {
            var _ref6 = _asyncToGenerator(
                /*#__PURE__*/ regeneratorRuntime.mark(function _callee6(url, config, action) {
                    var result;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch ((_context6.prev = _context6.next)) {
                                case 0:
                                    _context6.next = 2;
                                    return _this.fetch(url, config, action);

                                case 2:
                                    result = _context6.sent;

                                    if (!(result.status >= 300)) {
                                        _context6.next = 5;
                                        break;
                                    }

                                    throw Error(_constants.SOMETHING_WENT_WRONG_ERROR);

                                case 5:
                                    _context6.next = 7;
                                    return result.json();

                                case 7:
                                    return _context6.abrupt("return", _context6.sent);

                                case 8:
                                case "end":
                                    return _context6.stop();
                            }
                        }
                    }, _callee6);
                })
            );

            return function(_x17, _x18, _x19) {
                return _ref6.apply(this, arguments);
            };
        })();

        this.getFullUrl = function(pathStr, queryParams) {
            var path = new _normalisedURLPath["default"](pathStr);
            var fullUrl = ""
                .concat(_this.recipe.getAppInfo().apiDomain.getAsStringDangerous())
                .concat(_this.recipe.getAppInfo().apiBasePath.getAsStringDangerous())
                .concat(path.getAsStringDangerous());

            if (queryParams === undefined) {
                return fullUrl;
            } // If query params, add.

            return fullUrl + "?" + new URLSearchParams(queryParams);
        };

        this.recipe = recipe;
    };
/*
 * Instance Methods.
 */
exports["default"] = HttpRequest;
