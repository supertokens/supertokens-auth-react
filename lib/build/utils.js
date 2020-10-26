"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRecipeIdFromSearch = getRecipeIdFromSearch;
exports.isTest = isTest;
exports.mergeFormFields = mergeFormFields;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;

var _constants = require("./constants");

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

/*
 * getRecipeIdFromPath
 * Input:
 * Output: The "rid" query param if present, null otherwise.
 */
function getRecipeIdFromSearch(search) {
    var urlParams = new URLSearchParams(search);
    return urlParams.get(_constants.RECIPE_ID_QUERY_PARAM);
}
/*
 * isTest
 */

function isTest() {
    return process.env.TEST_MODE === "testing";
}
/*
 * mergeFormFields by keeping the provided order, defaultFormFields or merged first, and unmerged userFormFields after.
 */

function mergeFormFields(defaultFormFields, userFormFields) {
    // Create a new array with default fields.
    var mergedFormFields = defaultFormFields; // Loop through user provided fields.

    for (var i = 0; i < userFormFields.length; i++) {
        var userField = userFormFields[i];
        var isNewField = true; // Loop through the merged fields array.

        for (var j = 0; j < mergedFormFields.length; j++) {
            var mergedField = mergedFormFields[j]; // If id is equal, merge the fields

            if (userField.id === mergedField.id) {
                // Make sure that email and password are kept mandatory.
                var optional = mergedField.optional; // Init with default value.
                // If user provided value, overwrite.

                if (userField.optional !== undefined) {
                    optional = userField.optional;
                } // If "email" or "password", always mandatory.

                if (["email", "password"].includes(userField.id) === true) {
                    optional = false;
                } // Merge.

                mergedFormFields[j] = _objectSpread(
                    _objectSpread(_objectSpread({}, mergedFormFields[j]), userField),
                    {},
                    {
                        optional: optional
                    }
                );
                isNewField = false;
                break;
            }
        } // If new field, push to mergeFormFields.

        if (isNewField) {
            mergedFormFields.push(userField);
        }
    }

    return mergedFormFields;
}
/*
 * validateEmail.
 */

function validateEmail(_x) {
    return _validateEmail.apply(this, arguments);
}
/*
 * validatePassword.
 * min 8 characters.
 * Contains lowercase, uppercase, and numbers.
 */

function _validateEmail() {
    _validateEmail = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(email) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch ((_context.prev = _context.next)) {
                        case 0:
                            return _context.abrupt(
                                "return",
                                new Promise(function(resolve) {
                                    return resolve(undefined);
                                })
                            );

                        case 1:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee);
        })
    );
    return _validateEmail.apply(this, arguments);
}

function validatePassword(_x2) {
    return _validatePassword.apply(this, arguments);
}

function _validatePassword() {
    _validatePassword = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(password) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            return _context2.abrupt(
                                "return",
                                new Promise(function(resolve) {
                                    return resolve(undefined);
                                })
                            );

                        case 1:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2);
        })
    );
    return _validatePassword.apply(this, arguments);
}
