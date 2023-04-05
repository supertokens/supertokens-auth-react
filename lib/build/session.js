"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

require("./utils.js");
var WebJSSessionRecipe = require("supertokens-web-js/recipe/session");
require("./session-shared2.js");
var sessionAuth = require("./session-shared.js");
var session = require("./session-shared3.js");
require("react");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("supertokens-web-js/utils/windowHandler");
require("./recipeModule-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("react/jsx-runtime");
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
