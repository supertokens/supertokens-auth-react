"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var SessionContext = react_1.default.createContext({
    doesSessionExist: false,
    userId: "",
    jwtPayload: {},
});
exports.default = SessionContext;
//# sourceMappingURL=sessionContext.js.map
