"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRecipeIdFromSearch = getRecipeIdFromSearch;
exports.isTest = isTest;
exports.mergeFormFields = mergeFormFields;
exports.normaliseInputAppInfoOrThrowError = normaliseInputAppInfoOrThrowError;
exports.validateFormOrThrow = validateFormOrThrow;
exports.capitalize = capitalize;
exports.defaultValidate = defaultValidate;
exports.openExternalLink = openExternalLink;
exports.getCurrentNormalisedUrlPath = getCurrentNormalisedUrlPath;

var _constants = require("./constants");

var _normalisedURLDomain = _interopRequireDefault(require("./normalisedURLDomain"));

var _normalisedURLPath = _interopRequireDefault(require("./normalisedURLPath"));

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

                if (_constants.MANDATORY_FORM_FIELDS_ID_ARRAY.includes(userField.id)) {
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
            mergedFormFields.push(
                _objectSpread(
                    {
                        optional: false,
                        placeholder: capitalize(userField.id),
                        validate: defaultValidate
                    },
                    userField
                )
            );
        }
    }

    return mergedFormFields;
}

function normaliseInputAppInfoOrThrowError(appInfo) {
    if (appInfo === undefined) {
        throw new Error("Please provide the appInfo object when calling supertokens.init");
    }

    if (appInfo.apiDomain === undefined) {
        throw new Error("Please provide your apiDomain inside the appInfo object when calling supertokens.init");
    }

    if (appInfo.appName === undefined) {
        throw new Error("Please provide your appName inside the appInfo object when calling supertokens.init");
    }

    if (appInfo.websiteDomain === undefined) {
        throw new Error("Please provide your websiteDomain inside the appInfo object when calling supertokens.init");
    }

    return {
        appName: appInfo.appName,
        apiDomain: new _normalisedURLDomain["default"](appInfo.apiDomain),
        websiteDomain: new _normalisedURLDomain["default"](appInfo.websiteDomain),
        apiBasePath: getNormalisedURLPathOrDefault(_constants.DEFAULT_API_BASE_PATH, appInfo.apiBasePath),
        websiteBasePath: getNormalisedURLPathOrDefault(_constants.DEFAULT_WEBSITE_BASE_PATH, appInfo.websiteBasePath)
    };
}

function getNormalisedURLPathOrDefault(defaultPath, path) {
    if (path !== undefined) {
        return new _normalisedURLPath["default"](path);
    } else {
        return new _normalisedURLPath["default"](defaultPath);
    }
}
/*
 * validateFormOrThrow
 */
// We check that the number of fields in input and config form field is the same.
// We check that each item in the config form field is also present in the input form field

function validateFormOrThrow(_x, _x2) {
    return _validateFormOrThrow.apply(this, arguments);
}
/*
 * capitalize
 */

function _validateFormOrThrow() {
    _validateFormOrThrow = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee(inputs, configFormFields) {
            var validationErrors, _loop, i;

            return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                    switch ((_context2.prev = _context2.next)) {
                        case 0:
                            validationErrors = [];

                            if (!(configFormFields.length !== inputs.length)) {
                                _context2.next = 3;
                                break;
                            }

                            throw Error("Are you sending too many / too few formFields?");

                        case 3:
                            _loop = /*#__PURE__*/ regeneratorRuntime.mark(function _loop(i) {
                                var field, input, error;
                                return regeneratorRuntime.wrap(function _loop$(_context) {
                                    while (1) {
                                        switch ((_context.prev = _context.next)) {
                                            case 0:
                                                field = configFormFields[i]; // Find corresponding input value.

                                                input = inputs.find(function(i) {
                                                    return i.id === field.id;
                                                }); // Absent or not optional empty field

                                                if (
                                                    !(
                                                        input === undefined ||
                                                        (input.value === "" && field.optional === false)
                                                    )
                                                ) {
                                                    _context.next = 6;
                                                    break;
                                                }

                                                validationErrors.push({
                                                    error: "This field can not be empty",
                                                    id: field.id
                                                });
                                                _context.next = 10;
                                                break;

                                            case 6:
                                                _context.next = 8;
                                                return field.validate(input.value);

                                            case 8:
                                                error = _context.sent;

                                                // If error, add it.
                                                if (error !== undefined) {
                                                    validationErrors.push({
                                                        error: error,
                                                        id: field.id
                                                    });
                                                }

                                            case 10:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _loop);
                            });
                            i = 0;

                        case 5:
                            if (!(i < configFormFields.length)) {
                                _context2.next = 10;
                                break;
                            }

                            return _context2.delegateYield(_loop(i), "t0", 7);

                        case 7:
                            i++;
                            _context2.next = 5;
                            break;

                        case 10:
                            return _context2.abrupt("return", validationErrors);

                        case 11:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee);
        })
    );
    return _validateFormOrThrow.apply(this, arguments);
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
/*
 * defaultValidate
 */

function defaultValidate(_x3) {
    return _defaultValidate.apply(this, arguments);
}
/*
 * openExternalLink
 */

function _defaultValidate() {
    _defaultValidate = _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(value) {
            return regeneratorRuntime.wrap(function _callee2$(_context3) {
                while (1) {
                    switch ((_context3.prev = _context3.next)) {
                        case 0:
                            return _context3.abrupt("return", undefined);

                        case 1:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee2);
        })
    );
    return _defaultValidate.apply(this, arguments);
}

function openExternalLink(link) {
    if (link === undefined) {
        return;
    }

    window.open(link, "_blank");
}
/*
 * getCurrentNormalisedUrlPath
 */

function getCurrentNormalisedUrlPath() {
    return new _normalisedURLPath["default"](window.location.pathname);
}
