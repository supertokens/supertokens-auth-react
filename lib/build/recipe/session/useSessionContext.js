"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var SessionContext_1 = __importDefault(require("./SessionContext"));
var useSessionContext = function () {
    return react_1.default.useContext(SessionContext_1.default);
};
exports.default = useSessionContext;
//# sourceMappingURL=useSessionContext.js.map
