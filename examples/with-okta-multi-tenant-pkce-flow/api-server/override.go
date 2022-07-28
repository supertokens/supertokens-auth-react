package main

import (
	"net/http"

	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
	"github.com/supertokens/supertokens-golang/supertokens"
)

// Optional session override to add TenantID to the accessTokenPayload
func sessionFunctionsOverride(originalImplementation sessmodels.RecipeInterface) sessmodels.RecipeInterface {
	oCreateNewSession := *originalImplementation.CreateNewSession
	nCreateNewSession := func(res http.ResponseWriter, userID string, accessTokenPayload map[string]interface{}, sessionData map[string]interface{}, userContext supertokens.UserContext) (sessmodels.SessionContainer, error) {
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
