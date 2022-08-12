"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var sessionContext_1 = __importDefault(require("./sessionContext"));
var useSessionContext = function () {
    var ctx = react_1.default.useContext(sessionContext_1.default);
    if (ctx.isDefault === true) {
        throw new Error("Cannot use useSessionContext outside auth wrapper components.");
    }
    return ctx;
};
exports.default = useSessionContext;
