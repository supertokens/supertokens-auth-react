"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var session = require("./session-shared2.js");
require("react/jsx-runtime");
require("react");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/utils");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/recipe/session/recipe");
require("supertokens-web-js/recipe/session");

exports.SessionContext = sessionAuth.SessionContext;
exports.BooleanClaim = session.BooleanClaim;
exports.PrimitiveArrayClaim = session.PrimitiveArrayClaim;
exports.PrimitiveClaim = session.PrimitiveClaim;
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
//# sourceMappingURL=session.js.map
