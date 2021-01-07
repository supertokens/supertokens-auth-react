"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailPasswordAuth", {
    enumerable: true,
    get: function get() {
        return _emailPasswordAuth["default"];
    }
});
Object.defineProperty(exports, "SignInAndUp", {
    enumerable: true,
    get: function get() {
        return _SignInAndUp["default"];
    }
});
Object.defineProperty(exports, "SignInAndUpTheme", {
    enumerable: true,
    get: function get() {
        return _signInAndUp["default"];
    }
});
Object.defineProperty(exports, "ResetPasswordUsingToken", {
    enumerable: true,
    get: function get() {
        return _resetPasswordUsingToken["default"];
    }
});
Object.defineProperty(exports, "ResetPasswordUsingTokenTheme", {
    enumerable: true,
    get: function get() {
        return _resetPasswordUsingToken2["default"];
    }
});
Object.defineProperty(exports, "EmailVerification", {
    enumerable: true,
    get: function get() {
        return _emailVerification["default"];
    }
});
Object.defineProperty(exports, "EmailVerificationScreenTheme", {
    enumerable: true,
    get: function get() {
        return _emailVerificationScreen["default"];
    }
});
exports.signOut = exports.isEmailVerified = exports.init = exports.EmailPasswordAPIWrapper = exports[
    "default"
] = void 0;

var _emailPassword = _interopRequireDefault(require("./emailPassword"));

var _emailPasswordAuth = _interopRequireDefault(require("./components/emailPasswordAuth"));

var _SignInAndUp = _interopRequireDefault(require("./components/features/signInAndUp/SignInAndUp"));

var _signInAndUp = _interopRequireDefault(require("./components/themes/default/signInAndUp"));

var _resetPasswordUsingToken = _interopRequireDefault(
    require("./components/features/resetPasswordUsingToken/resetPasswordUsingToken")
);

var _resetPasswordUsingToken2 = _interopRequireDefault(require("./components/themes/default/resetPasswordUsingToken"));

var _emailVerification = _interopRequireDefault(require("./components/features/emailVerification/emailVerification"));

var _emailVerificationScreen = _interopRequireDefault(
    require("./components/themes/default/emailVerification/emailVerificationScreen")
);

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
var EmailPasswordAPIWrapper = /*#__PURE__*/ (function() {
    function EmailPasswordAPIWrapper() {
        _classCallCheck(this, EmailPasswordAPIWrapper);
    }

    _createClass(EmailPasswordAPIWrapper, null, [
        {
            key: "init",

            /*
             * Static attributes.
             */
            value: function init(config) {
                return _emailPassword["default"].init(config);
            }
        },
        {
            key: "signOut",
            value: (function() {
                var _signOut = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                                switch ((_context.prev = _context.next)) {
                                    case 0:
                                        return _context.abrupt("return", _emailPassword["default"].signOut());

                                    case 1:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, _callee);
                    })
                );

                function signOut() {
                    return _signOut.apply(this, arguments);
                }

                return signOut;
            })()
        },
        {
            key: "isEmailVerified",
            value: (function() {
                var _isEmailVerified = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                            while (1) {
                                switch ((_context2.prev = _context2.next)) {
                                    case 0:
                                        return _context2.abrupt("return", _emailPassword["default"].isEmailVerified());

                                    case 1:
                                    case "end":
                                        return _context2.stop();
                                }
                            }
                        }, _callee2);
                    })
                );

                function isEmailVerified() {
                    return _isEmailVerified.apply(this, arguments);
                }

                return isEmailVerified;
            })()
        }
    ]);

    return EmailPasswordAPIWrapper;
})();

exports.EmailPasswordAPIWrapper = exports["default"] = EmailPasswordAPIWrapper;
EmailPasswordAPIWrapper.EmailPasswordAuth = _emailPasswordAuth["default"];
EmailPasswordAPIWrapper.SignInAndUp = _SignInAndUp["default"];
EmailPasswordAPIWrapper.SignInAndUpTheme = _signInAndUp["default"];
EmailPasswordAPIWrapper.ResetPasswordUsingToken = _resetPasswordUsingToken["default"];
EmailPasswordAPIWrapper.ResetPasswordUsingTokenTheme = _resetPasswordUsingToken2["default"];
EmailPasswordAPIWrapper.EmailVerification = _emailVerification["default"];
EmailPasswordAPIWrapper.EmailVerificationScreenTheme = _emailVerificationScreen["default"];
var init = EmailPasswordAPIWrapper.init;
exports.init = init;
var signOut = EmailPasswordAPIWrapper.signOut;
exports.signOut = signOut;
var isEmailVerified = EmailPasswordAPIWrapper.isEmailVerified;
exports.isEmailVerified = isEmailVerified;
