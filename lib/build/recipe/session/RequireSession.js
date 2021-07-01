"use strict";
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var sessionContext_1 = __importDefault(require("./sessionContext"));
exports.RequireSession = function (_a) {
    var children = _a.children,
        _b = _a.requireSession,
        requireSession = _b === void 0 ? true : _b;
    var doesSessionExist = react_1.useContext(sessionContext_1.default).doesSessionExist;
    if (requireSession === false) {
        return react_1.default.createElement(react_1.default.Fragment, null, children);
    }
    return doesSessionExist ? react_1.default.createElement(react_1.default.Fragment, null, children) : null;
};
//# sourceMappingURL=RequireSession.js.map
