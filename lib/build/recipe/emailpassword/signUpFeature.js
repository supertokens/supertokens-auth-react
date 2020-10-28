"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = void 0;

var _utils = require("../../utils");

var _utils2 = require("./utils");

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
var SignUpFeature = /*#__PURE__*/ (function() {
    /*
     * Instance attributes.
     */

    /*
     * Constructor.
     */
    function SignUpFeature(config) {
        var _this = this;

        _classCallCheck(this, SignUpFeature);

        this.getFormFields = function() {
            return _this.formFields;
        };

        this.getStyle = function() {
            return _this.style;
        };

        this.getPrivacyPolicyLink = function() {
            return _this.privacyPolicyLink;
        };

        this.getTermsAndConditionsLink = function() {
            return _this.termsAndConditionsLink;
        };

        this.getDefaultFormFields = function() {
            return [
                {
                    id: "email",
                    label: "Email",
                    placeholder: "youremail@example.com",
                    validate: _utils2.defaultEmailValidator,
                    optional: false
                },
                {
                    id: "password",
                    label: "Password",
                    placeholder: "Enter your password",
                    validate: _utils2.defaultPasswordValidator,
                    optional: false
                }
            ];
        };

        var defaultFormFields = this.getDefaultFormFields();
        var userFormFields = [];

        if (config !== undefined) {
            this.style = config.style || {};
            this.privacyPolicyLink = config.privacyPolicyLink;
            this.termsAndConditionsLink = config.termsAndConditionsLink;

            if (config.formFields !== undefined) {
                userFormFields = config.formFields;
            }
        }

        this.formFields = (0, _utils.mergeFormFields)(defaultFormFields, userFormFields);
    }
    /*
     * Instance methods.
     */

    _createClass(SignUpFeature, [
        {
            key: "validate",
            value: (function() {
                var _validate = _asyncToGenerator(
                    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(input) {
                        return regeneratorRuntime.wrap(
                            function _callee$(_context) {
                                while (1) {
                                    switch ((_context.prev = _context.next)) {
                                        case 0:
                                            return _context.abrupt(
                                                "return",
                                                (0, _utils.validateFormOrThrow)(input, this.formFields)
                                            );

                                        case 1:
                                        case "end":
                                            return _context.stop();
                                    }
                                }
                            },
                            _callee,
                            this
                        );
                    })
                );

                function validate(_x) {
                    return _validate.apply(this, arguments);
                }

                return validate;
            })()
        }
    ]);

    return SignUpFeature;
})();

exports["default"] = SignUpFeature;
