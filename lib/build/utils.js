"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRecipeIdFromSearch = getRecipeIdFromSearch;
exports.isTest = isTest;
exports.normaliseInputAppInfoOrThrowError = normaliseInputAppInfoOrThrowError;
exports.validateFormOrThrow = validateFormOrThrow;
exports.openExternalLink = openExternalLink;
exports.getCurrentNormalisedUrlPath = getCurrentNormalisedUrlPath;
exports.redirectTo = redirectTo;

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
 * openExternalLink
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
/*
 * redirectTo
 */

function redirectTo(path) {
    var newPath = path.getAsStringDangerous();

    if (newPath.length === 0) {
        newPath = "/";
    }

    window.location.href = newPath;
}
