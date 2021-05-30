"use strict";
var __assign =
    (this && this.__assign) ||
    function () {
        __assign =
            Object.assign ||
            function (t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                }
                return t;
            };
        return __assign.apply(this, arguments);
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
var supertokens_website_1 = __importDefault(require("supertokens-website"));
var RecipeImplementation = /** @class */ (function () {
    function RecipeImplementation(config) {
        // TODO: We should initialise the above SDK only if the user
        // is using our session implementation - since it adds fetch interceptors on init.
        this.getUserId = function () {
            return supertokens_website_1.default.getUserId();
        };
        this.getJWTPayloadSecurely = function () {
            return supertokens_website_1.default.getJWTPayloadSecurely();
        };
        this.doesSessionExist = function () {
            return supertokens_website_1.default.doesSessionExist();
        };
        this.signOut = function () {
            return supertokens_website_1.default.signOut();
        };
        var usersHeadersForRefreshAPI = {};
        if (config.refreshAPICustomHeaders !== undefined) {
            usersHeadersForRefreshAPI = config.refreshAPICustomHeaders;
        }
        var usersHeadersForSignoutAPI = {};
        if (config.signoutAPICustomHeaders !== undefined) {
            usersHeadersForSignoutAPI = config.signoutAPICustomHeaders;
        }
        supertokens_website_1.default.init({
            sessionScope:
                config.sessionScope === undefined
                    ? undefined
                    : {
                          scope: config.sessionScope,
                          authDomain: config.appInfo.websiteDomain.getAsStringDangerous(),
                      },
            refreshAPICustomHeaders: __assign({ rid: config.recipeId }, usersHeadersForRefreshAPI),
            signoutAPICustomHeaders: __assign({ rid: config.recipeId }, usersHeadersForSignoutAPI),
            autoAddCredentials: config.autoAddCredentials,
            sessionExpiredStatusCode: config.sessionExpiredStatusCode,
            apiDomain: config.appInfo.apiDomain.getAsStringDangerous(),
            apiBasePath: config.appInfo.apiBasePath.getAsStringDangerous(),
            isInIframe: config.isInIframe,
        });
    }
    return RecipeImplementation;
})();
exports.default = RecipeImplementation;
//# sourceMappingURL=recipeImplementation.js.map
