package main

import (
	"net/http"

	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func sessionFunctionsOverride(originalImplementation sessmodels.RecipeInterface) sessmodels.RecipeInterface {
	// Optional session override to add tenant info to the user context
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
