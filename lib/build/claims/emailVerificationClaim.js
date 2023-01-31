"use strict";
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationClaimClass = void 0;
var emailverification_1 = require("supertokens-web-js/recipe/emailverification");
var recipe_1 = __importDefault(require("../recipe/emailverification/recipe"));
var EmailVerificationClaimClass = /** @class */ (function (_super) {
    __extends(EmailVerificationClaimClass, _super);
    function EmailVerificationClaimClass(getRecipeImpl, onSuccessRedirection, onFailureRedirection) {
        var _this = _super.call(this, getRecipeImpl) || this;
        var validatorsWithCallbacks = __assign({}, _this.validators);
        var _loop_1 = function (key) {
            var validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __assign(__assign({}, validator.apply(void 0, args)), {
                    onSuccessRedirection: onSuccessRedirection,
                    onFailureRedirection: function (args) {
                        if (onFailureRedirection !== undefined) {
                            return onFailureRedirection(args);
                        }
                        var recipe = recipe_1.default.getInstanceOrThrow();
                        if (recipe.config.mode === "REQUIRED") {
                            return recipe.getRedirectUrl({ action: "VERIFY_EMAIL" });
                        }
                        return undefined;
                    },
                });
            };
        };
        for (var key in validatorsWithCallbacks) {
            _loop_1(key);
        }
        _this.validators = validatorsWithCallbacks;
        return _this;
    }
    return EmailVerificationClaimClass;
})(emailverification_1.EmailVerificationClaimClass);
exports.EmailVerificationClaimClass = EmailVerificationClaimClass;
