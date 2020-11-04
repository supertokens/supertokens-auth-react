"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.doesSessionExist = exports.attemptRefreshingSession = exports.getJWTPayloadSecurely = exports.getUserId = exports.getRefreshURLDomain = exports.init = exports.SessionAPIWrapper = exports[
    "default"
] = void 0;

var _session = _interopRequireDefault(require("./session"));

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
var SessionAPIWrapper = /*#__PURE__*/ (function() {
    function SessionAPIWrapper() {
        _classCallCheck(this, SessionAPIWrapper);
    }

    _createClass(SessionAPIWrapper, null, [
        {
            key: "init",
            value: function init(config) {
                return _session["default"].init(config);
            }
        },
        {
            key: "getRefreshURLDomain",
            value: function getRefreshURLDomain() {
                return _session["default"].getRefreshURLDomain();
            }
        },
        {
            key: "getUserId",
            value: function getUserId() {
                return _session["default"].getUserId();
            }
        },
        {
            key: "getJWTPayloadSecurely",
            value: (function() {
                var _getJWTPayloadSecurely = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch ((_context.prev = _context.next)) {
                                    case 0:
                                        return _context.abrupt("return", _session["default"].getJWTPayloadSecurely());

                                    case 1:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee);
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
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch ((_context2.prev = _context2.next)) {
                                    case 0:
                                        return _context2.abrupt(
                                            "return",
                                            _session["default"].attemptRefreshingSession()
                                        );

                                    case 1:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        }, _callee2);
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
                return _session["default"].doesSessionExist();
            }
        }
    ]);

    return SessionAPIWrapper;
})();

exports.SessionAPIWrapper = exports["default"] = SessionAPIWrapper;
var init = SessionAPIWrapper.init;
exports.init = init;
var getRefreshURLDomain = SessionAPIWrapper.getRefreshURLDomain;
exports.getRefreshURLDomain = getRefreshURLDomain;
var getUserId = SessionAPIWrapper.getUserId;
exports.getUserId = getUserId;
var getJWTPayloadSecurely = SessionAPIWrapper.getJWTPayloadSecurely;
exports.getJWTPayloadSecurely = getJWTPayloadSecurely;
var attemptRefreshingSession = SessionAPIWrapper.attemptRefreshingSession;
exports.attemptRefreshingSession = attemptRefreshingSession;
var doesSessionExist = SessionAPIWrapper.doesSessionExist;
exports.doesSessionExist = doesSessionExist;
