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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveArrayClaim = void 0;
var session_1 = require("supertokens-web-js/recipe/session");
var PrimitiveArrayClaim = /** @class */ (function (_super) {
    __extends(PrimitiveArrayClaim, _super);
    function PrimitiveArrayClaim(config) {
        var _this = _super.call(this, config) || this;
        var validatorsWithCallbacks = __assign({}, _this.validators);
        var _loop_1 = function (key) {
            var validator = validatorsWithCallbacks[key];
            validatorsWithCallbacks[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __assign(__assign({}, validator.apply(void 0, args)), {
                    onSuccess: config.onSuccess,
                    onFailure: config.onFailure,
                });
            };
        };
        for (var key in validatorsWithCallbacks) {
            _loop_1(key);
        }
        _this.validators = validatorsWithCallbacks;
        return _this;
    }
    return PrimitiveArrayClaim;
})(session_1.PrimitiveArrayClaim);
exports.PrimitiveArrayClaim = PrimitiveArrayClaim;
