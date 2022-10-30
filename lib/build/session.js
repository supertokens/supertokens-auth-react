"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

require("./assets.js");
var authRecipe = require("./authRecipe-shared.js");
require("react/jsx-runtime");
require("react");

exports.BooleanClaim = authRecipe.session_11;
exports.PrimitiveArrayClaim = authRecipe.session_12;
exports.PrimitiveClaim = authRecipe.session_13;
exports.SessionAuth = authRecipe.SessionAuth;
exports.SessionClaimValidator = authRecipe.build_4;
exports.SessionContext = authRecipe.SessionContext;
exports.addAxiosInterceptors = authRecipe.addAxiosInterceptors;
exports.attemptRefreshingSession = authRecipe.attemptRefreshingSession;
exports.default = authRecipe.SessionAPIWrapper;
exports.doesSessionExist = authRecipe.doesSessionExist;
exports.getAccessTokenPayloadSecurely = authRecipe.getAccessTokenPayloadSecurely;
exports.getInvalidClaimsFromResponse = authRecipe.getInvalidClaimsFromResponse;
exports.getUserId = authRecipe.getUserId;
exports.init = authRecipe.init;
exports.signOut = authRecipe.signOut;
exports.useClaimValue = authRecipe.useClaimValue;
exports.useSessionContext = authRecipe.useSessionContext$1;
exports.validateClaims = authRecipe.validateClaims;
//# sourceMappingURL=session.js.map
