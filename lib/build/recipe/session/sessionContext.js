"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefaultContext = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var SessionContext = react_1.default.createContext({
    doesSessionExist: false,
    userId: "DEFAULT_USER_ID",
    accessTokenPayload: {},
});
function isDefaultContext(sessionContext) {
    return sessionContext.userId === "DEFAULT_USER_ID";
}
exports.isDefaultContext = isDefaultContext;
exports.default = SessionContext;
