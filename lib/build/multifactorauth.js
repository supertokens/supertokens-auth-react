"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

require("./genericComponentOverrideContext.js");
var multifactorauth = require("./multifactorauth-shared2.js");
require("./multifactorauth-shared.js");
require("supertokens-web-js");
require("supertokens-web-js/utils/cookieHandler");
require("supertokens-web-js/utils/postSuperTokensInitCallbacks");
require("supertokens-web-js/utils/windowHandler");
require("supertokens-web-js/recipe/multitenancy");
require("supertokens-web-js/utils");
require("react");
require("supertokens-web-js/utils/normalisedURLDomain");
require("supertokens-web-js/utils/normalisedURLPath");
require("react/jsx-runtime");
require("supertokens-web-js/recipe/multifactorauth");
require("supertokens-web-js/utils/sessionClaimValidatorStore");
require("./recipeModule-shared.js");

exports.MultiFactorAuthClaim = multifactorauth.MultiFactorAuthClaim;
exports.MultiFactorAuthComponentsOverrideProvider = multifactorauth.MultiFactorAuthComponentsOverrideProvider;
exports.default = multifactorauth.Wrapper;
exports.getMFAInfo = multifactorauth.getMFAInfo;
exports.init = multifactorauth.init;
