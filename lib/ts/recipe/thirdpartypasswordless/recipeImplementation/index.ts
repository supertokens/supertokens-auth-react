import { TPPWlessRecipeInterface } from "../types";
import { NormalisedAppInfo } from "../../../types";
import PasswordlessRecipeImplementation from "../../passwordless/recipeImplementation";
import ThirdPartyRecipeImplementation from "../../thirdparty/recipeImplementation";
import { NormalisedConfig as EPConfig } from "../../passwordless/types";
import { NormalisedConfig as TPConfig, StateObject } from "../../thirdparty/types";
import DerivedPwless from "./passwordlessImplementation";
import DerivedTP from "./thirdPartyImplementation";

export default function getRecipeImplementation(recipeId: string, appInfo: NormalisedAppInfo): TPPWlessRecipeInterface {
    const passwordlessImpl = PasswordlessRecipeImplementation(recipeId, appInfo);
    const thirdPartyImpl = ThirdPartyRecipeImplementation(recipeId, appInfo);

    return {
        consumeCode(input) {
            return passwordlessImpl.consumeCode.bind(DerivedPwless(this))(input);
        },
        createCode(input) {
            return passwordlessImpl.createCode.bind(DerivedPwless(this))(input);
        },
        doesPasswordlessUserPhoneNumberExist(input) {
            return passwordlessImpl.doesPhoneNumberExist.bind(DerivedPwless(this))(input);
        },
        doesPasswordlessUserEmailExist: async function (input: { email: string; config: EPConfig }) {
            return passwordlessImpl.doesEmailExist.bind(DerivedPwless(this))(input);
        },
        resendCode(input) {
            return passwordlessImpl.resendCode.bind(DerivedPwless(this))(input);
        },
        clearLoginAttemptInfo() {
            return passwordlessImpl.clearLoginAttemptInfo.bind(DerivedPwless(this))();
        },
        getLoginAttemptInfo() {
            return passwordlessImpl.getLoginAttemptInfo.bind(DerivedPwless(this))();
        },
        setLoginAttemptInfo(input) {
            return passwordlessImpl.setLoginAttemptInfo.bind(DerivedPwless(this))(input);
        },

        getOAuthAuthorisationURL: async function (input: { thirdPartyId: string; config: TPConfig }) {
            return thirdPartyImpl.getOAuthAuthorisationURL.bind(DerivedTP(this))(input);
        },
        thirdPartySignInAndUp: async function (input) {
            return thirdPartyImpl.signInAndUp.bind(DerivedTP(this))(input);
        },
        getOAuthState: function () {
            return thirdPartyImpl.getOAuthState.bind(DerivedTP(this))();
        },
        setOAuthState: function (input: StateObject) {
            return thirdPartyImpl.setOAuthState.bind(DerivedTP(this))(input);
        },
        redirectToThirdPartyLogin: function (input: { thirdPartyId: string; config: TPConfig; state?: StateObject }) {
            return thirdPartyImpl.redirectToThirdPartyLogin.bind(DerivedTP(this))(input);
        },
    };
}
