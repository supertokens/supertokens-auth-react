"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

require("./superTokens.js");
var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
var sessionAuth = require("./session-shared.js");
var session = require("./session-shared2.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react/jsx-runtime");
require("supertokens-web-js/lib/build/normalisedURLPath");
require("supertokens-web-js/recipe/thirdparty");
require("./index2.js");

Object.defineProperty(exports, "BooleanClaim", {
    enumerable: true,
    get: function () {
        return WebJSSessionRecipe.BooleanClaim;
    },
});
Object.defineProperty(exports, "PrimitiveArrayClaim", {
    enumerable: true,
    get: function () {
        return WebJSSessionRecipe.PrimitiveArrayClaim;
    },
});
Object.defineProperty(exports, "PrimitiveClaim", {
    enumerable: true,
    get: function () {
        return WebJSSessionRecipe.PrimitiveClaim;
    },
});
Object.defineProperty(exports, "SessionClaimValidator", {
    enumerable: true,
    get: function () {
        return WebJSSessionRecipe.SessionClaimValidator;
    },
});
exports.SessionContext = sessionAuth.SessionContext;
exports.SessionAuth = session.SessionAuth;
exports.addAxiosInterceptors = session.addAxiosInterceptors;
exports.attemptRefreshingSession = session.attemptRefreshingSession;
exports.default = session.SessionAPIWrapper;
exports.doesSessionExist = session.doesSessionExist;
exports.getAccessToken = session.getAccessToken;
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
