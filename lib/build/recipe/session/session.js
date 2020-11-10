"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _recipeModule = _interopRequireDefault(require("../recipeModule"));

var _utils = require("../../utils");

var _supertokensWebsite = _interopRequireDefault(require("supertokens-website"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
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

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf =
        Object.setPrototypeOf ||
        function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
    return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
            result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function _getPrototypeOf(o) {
              return o.__proto__ || Object.getPrototypeOf(o);
          };
    return _getPrototypeOf(o);
}

/*
 * Class.
 */
var Session = /*#__PURE__*/ (function(_RecipeModule) {
    _inherits(Session, _RecipeModule);

    var _super = _createSuper(Session);

    /*
     * Static Attributes.
     */

    /*
     * Instance Attributes.
     */

    /*
     * Constructor.
     */
    function Session(config) {
        var _this;

        _classCallCheck(this, Session);

        _this = _super.call(this, config);

        _this.getFeatures = function() {
            return {};
        };

        _this.getRefreshURLDomain = function() {
            return _this.sessionSdk.getRefreshURLDomain();
        };

        _this.getUserId = function() {
            return _this.sessionSdk.getUserId();
        };

        _this.getJWTPayloadSecurely = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch ((_context.prev = _context.next)) {
                            case 0:
                                return _context.abrupt("return", _this.sessionSdk.getJWTPayloadSecurely());

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee);
            })
        );
        _this.attemptRefreshingSession = /*#__PURE__*/ _asyncToGenerator(
            /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch ((_context2.prev = _context2.next)) {
                            case 0:
                                return _context2.abrupt("return", _this.sessionSdk.attemptRefreshingSession());

                            case 1:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2);
            })
        );

        _this.doesSessionExist = function() {
            return _this.sessionSdk.doesSessionExist();
        };

        _this.addAxiosInterceptors = function(axiosInstance) {
            return _this.sessionSdk.addAxiosInterceptors(axiosInstance);
        };

        _this.setAuth0API = function(apiPath) {
            return _this.sessionSdk.setAuth0API(apiPath);
        };

        _this.getAuth0API = function() {
            return _this.sessionSdk.getAuth0API();
        };

        var usersHeaders = {};

        if (config.refreshAPICustomHeaders !== undefined) {
            usersHeaders = config.refreshAPICustomHeaders;
        }

        _supertokensWebsite["default"].init({
            sessionScope: config.sessionScope,
            refreshAPICustomHeaders: _objectSpread(
                {
                    rid: _this.getRecipeId()
                },
                usersHeaders
            ),
            autoAddCredentials: config.autoAddCredentials,
            sessionExpiredStatusCode: config.sessionExpiredStatusCode,
            apiDomain: config.appInfo.apiDomain.getAsStringDangerous(),
            apiBasePath: config.appInfo.apiBasePath.getAsStringDangerous()
        });

        _this.sessionSdk = _supertokensWebsite["default"];
        return _this;
    }
    /*
     * Instance methods.
     */

    _createClass(Session, null, [
        {
            key: "init",

            /*
             * Static methods.
             */
            value: function init(config) {
                return function(appInfo) {
                    Session.instance = new Session(
                        _objectSpread(
                            _objectSpread({}, config),
                            {},
                            {
                                appInfo: appInfo,
                                recipeId: Session.RECIPE_ID
                            }
                        )
                    );
                    return Session.instance;
                };
            }
        },
        {
            key: "getInstanceOrThrow",
            value: function getInstanceOrThrow() {
                if (Session.instance === undefined) {
                    throw Error(
                        "No instance of ".concat(
                            Session.constructor.name,
                            ' found. Make sure to call the "init" method.'
                        )
                    ); // TODO Add relevant doc.
                }

                return Session.instance;
            }
        },
        {
            key: "getRefreshURLDomain",
            value: function getRefreshURLDomain() {
                return Session.getInstanceOrThrow().getRefreshURLDomain();
            }
        },
        {
            key: "getUserId",
            value: function getUserId() {
                return Session.getInstanceOrThrow().getUserId();
            }
        },
        {
            key: "getJWTPayloadSecurely",
            value: (function() {
                var _getJWTPayloadSecurely = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                            while (1) {
                                switch ((_context3.prev = _context3.next)) {
                                    case 0:
                                        return _context3.abrupt(
                                            "return",
                                            Session.getInstanceOrThrow().getJWTPayloadSecurely()
                                        );

                                    case 1:
                                    case "end":
                                        return _context3.stop();
                                }
                            }
                        }, _callee3);
                    })
                );

                function getJWTPayloadSecurely() {
                    return _getJWTPayloadSecurely.apply(this, arguments);
                }

                return getJWTPayloadSecurely;
            })()
        },
        {
            key: "attemptRefreshingSession",
            value: (function() {
                var _attemptRefreshingSession = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
                        return regeneratorRuntime.wrap(function _callee4$(_context4) {
                            while (1) {
                                switch ((_context4.prev = _context4.next)) {
                                    case 0:
                                        return _context4.abrupt(
                                            "return",
                                            Session.getInstanceOrThrow().attemptRefreshingSession()
                                        );

                                    case 1:
                                    case "end":
                                        return _context4.stop();
                                }
                            }
                        }, _callee4);
                    })
                );

                function attemptRefreshingSession() {
                    return _attemptRefreshingSession.apply(this, arguments);
                }

                return attemptRefreshingSession;
            })()
        },
        {
            key: "doesSessionExist",
            value: function doesSessionExist() {
                return Session.getInstanceOrThrow().doesSessionExist();
            } // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        },
        {
            key: "addAxiosInterceptors",
            value: function addAxiosInterceptors(axiosInstance) {
                return Session.getInstanceOrThrow().addAxiosInterceptors(axiosInstance);
            }
        },
        {
            key: "setAuth0API",
            value: function setAuth0API(apiPath) {
                return Session.getInstanceOrThrow().setAuth0API(apiPath);
            }
        },
        {
            key: "getAuth0API",
            value: function getAuth0API() {
                return Session.getInstanceOrThrow().getAuth0API();
            }
            /*
             * Tests methods.
             */
        },
        {
            key: "reset",
            value: function reset() {
                if (!(0, _utils.isTest)()) {
                    return;
                }

                Session.instance = undefined;
                return;
            }
        }
    ]);

    return Session;
})(_recipeModule["default"]);

exports["default"] = Session;
Session.RECIPE_ID = "session";
