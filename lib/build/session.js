"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var sessionAuth = require("./session-shared.js");
var session$1 = require("supertokens-web-js/recipe/session");
var session = require("./session-shared2.js");
var index = require("supertokens-website/index");
require("react/jsx-runtime");
require("react");
require("supertokens-website/utils/cookieHandler");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-website/utils/windowHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/recipe/session/recipe");

exports.SessionContext = sessionAuth.SessionContext;
Object.defineProperty(exports, "BooleanClaim", {
    enumerable: true,
    get: function () {
        return session$1.BooleanClaim;
    },
});
Object.defineProperty(exports, "PrimitiveArrayClaim", {
    enumerable: true,
    get: function () {
        return session$1.PrimitiveArrayClaim;
    },
});
Object.defineProperty(exports, "PrimitiveClaim", {
    enumerable: true,
    get: function () {
        return session$1.PrimitiveClaim;
    },
});
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
Object.defineProperty(exports, "SessionClaimValidator", {
    enumerable: true,
    get: function () {
        return index.SessionClaimValidator;
    },
});
//# sourceMappingURL=session.js.map
