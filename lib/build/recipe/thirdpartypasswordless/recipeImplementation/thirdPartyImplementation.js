"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getImpl(oI) {
    return {
        getOAuthAuthorisationURL: oI.getOAuthAuthorisationURL.bind(oI),
        getOAuthState: oI.getOAuthState.bind(oI),
        redirectToThirdPartyLogin: oI.redirectToThirdPartyLogin.bind(oI),
        setOAuthState: oI.setOAuthState.bind(oI),
        signInAndUp: oI.signInAndUp.bind(oI),
    };
}
exports.default = getImpl;
