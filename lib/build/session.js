"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var session = require("./session-shared2.js");
require("react/jsx-runtime");
require("react");
require("./recipe.js");
require("./index2.js");

exports.SessionContext = sessionAuth.SessionContext;
exports.SessionAuth = session.SessionAuth;
exports.addAxiosInterceptors = session.addAxiosInterceptors;
exports.attemptRefreshingSession = session.attemptRefreshingSession;
exports.default = session.SessionAPIWrapper;
exports.doesSessionExist = session.doesSessionExist;
exports.getAccessTokenPayloadSecurely = session.getAccessTokenPayloadSecurely;
exports.getClaimValue = session.getClaimValue;
exports.getInvalidClaimsFromResponse = session.getInvalidClaimsFromResponse;
exports.getUserId = session.getUserId;
exports.init = session.init;
exports.signOut = session.signOut;
exports.useClaimValue = session.useClaimValue;
exports.useSessionContext = session.useSessionContext$1;
exports.validateClaims = session.validateClaims;
exports.BooleanClaim = session.session.BooleanClaim;
exports.PrimitiveArrayClaim = session.session.PrimitiveArrayClaim;
exports.PrimitiveClaim = session.session.PrimitiveClaim;
exports.SessionClaimValidator = session.supertokensWebsiteExports.SessionClaimValidator;
//# sourceMappingURL=session.js.map
