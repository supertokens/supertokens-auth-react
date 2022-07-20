"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefaultContext = void 0;
var react_1 = __importDefault(require("react"));
var SessionContext = react_1.default.createContext({
    loading: true,
    isDefault: true,
});
// ts-prune-ignore-next
function isDefaultContext(sessionContext) {
    return sessionContext.isDefault;
}
exports.isDefaultContext = isDefaultContext;
exports.default = SessionContext;
