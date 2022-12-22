"use strict";
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
exports.createGenericComponentsOverrideContext = void 0;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var createGenericComponentsOverrideContext = function (v) {
    if (v === void 0) {
        v = {};
    }
    var genericContext = react_1.default.createContext(v);
    var useComponentsOverrideContext = function () {
        return react_1.default.useContext(genericContext);
    };
    var Provider = function (_a) {
        var children = _a.children,
            components = _a.components;
        return (0, jsx_runtime_1.jsx)(genericContext.Provider, __assign({ value: components }, { children: children }));
    };
    return [useComponentsOverrideContext, Provider, genericContext.Consumer];
};
exports.createGenericComponentsOverrideContext = createGenericComponentsOverrideContext;
