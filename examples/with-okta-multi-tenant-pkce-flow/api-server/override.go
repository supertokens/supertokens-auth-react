package main

import (
	"net/http"

	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"github.com/supertokens/supertokens-golang/supertokens"
)

// Optional session override to add TenantID to the accessTokenPayload
func sessionFunctionsOverride(originalImplementation sessmodels.RecipeInterface) sessmodels.RecipeInterface {
	oCreateNewSession := *originalImplementation.CreateNewSession
	nCreateNewSession := func(res http.ResponseWriter, userID string, accessTokenPayload map[string]interface{}, sessionData map[string]interface{}, userContext supertokens.UserContext) (sessmodels.SessionContainer, error) {
		// We are adding tenantId to the userContext in the Okta provider implementation, so that it can be used here
		tenantId, _ := (*userContext)["tenantId"].(string)
		if accessTokenPayload == nil {
			accessTokenPayload = map[string]interface{}{}
		}
		accessTokenPayload["tenantId"] = tenantId

		return oCreateNewSession(res, userID, accessTokenPayload, sessionData, userContext)
	}
	*originalImplementation.CreateNewSession = nCreateNewSession
	return originalImplementation
}

func apiOverride(originalImplementation tpmodels.APIInterface) tpmodels.APIInterface {
	// Override the signInUpPOST API to revoke the verifier once the sign in up API call is complete
	oSignInUpPOST := *originalImplementation.SignInUpPOST
	nSignInUpPOST := func(provider tpmodels.TypeProvider, code string, authCodeResponse interface{}, redirectURI string, options tpmodels.APIOptions, userContext supertokens.UserContext) (tpmodels.SignInUpPOSTResponse, error) {
		resp, err := oSignInUpPOST(provider, code, authCodeResponse, redirectURI, options, userContext)
		state := getStateFromRequest(options.Req)
		revokeVerifierForState(state)
		return resp, err
	}
	*originalImplementation.SignInUpPOST = nSignInUpPOST
	return originalImplementation
}
