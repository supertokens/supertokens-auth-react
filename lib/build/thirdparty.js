"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var thirdparty = require("./superTokens.js");
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
require("supertokens-web-js/recipe/session");
require("supertokens-web-js/utils");

exports.ActiveDirectory = thirdparty.ActiveDirectory;
exports.Apple = thirdparty.Apple;
exports.Bitbucket = thirdparty.Bitbucket;
exports.BoxySAML = thirdparty.BoxySAML;
exports.Discord = thirdparty.Discord;
exports.Facebook = thirdparty.Facebook;
exports.Github = thirdparty.Github;
exports.Gitlab = thirdparty.Gitlab;
exports.Google = thirdparty.Google;
exports.LinkedIn = thirdparty.LinkedIn;
exports.Okta = thirdparty.Okta;
exports.ThirdpartyComponentsOverrideProvider = thirdparty.ThirdpartyComponentsOverrideProvider;
exports.Twitter = thirdparty.Twitter;
exports.default = thirdparty.Wrapper;
exports.getAuthorisationURLWithQueryParamsAndSetState = thirdparty.getAuthorisationURLWithQueryParamsAndSetState;
exports.getStateAndOtherInfoFromStorage = thirdparty.getStateAndOtherInfoFromStorage;
exports.init = thirdparty.init;
exports.redirectToThirdPartyLogin = thirdparty.redirectToThirdPartyLogin$1;
exports.signInAndUp = thirdparty.signInAndUp;
exports.signOut = thirdparty.signOut;
