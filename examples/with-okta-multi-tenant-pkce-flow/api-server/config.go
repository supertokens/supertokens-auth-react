package main

import (
	"net/http"

	"github.com/supertokens/supertokens-golang/supertokens"
)

func getRequestFromUserContext(userContext supertokens.UserContext) *http.Request {
	if _default, ok := (*userContext)["_default"].(map[string]interface{}); ok {
		if request, ok := _default["request"].(*http.Request); ok {
			return request
		}
	}
	return nil
}

func getTenantIdFromUserContext(userContext supertokens.UserContext) string {
	// Fetching the tenantId from the request query params, update the logic as per your needs
	req := getRequestFromUserContext(userContext)
	return req.URL.Query().Get("tenant")
}

func getConfigForTenantId(tenantId string) OktaConfig {
	var config OktaConfig
	// TODO Query database to fetch the config corresponding to the tenantId
	// You will also need APIs to add/manage configs
	switch tenantId {
	case "tenant1":
		config = OktaConfig{
			ClientID:   "0oa5y2vfqhrTPAX8Q5d7",
			OktaDomain: "dev-8636097.okta.com",
		}

	case "tenant2":
		config = OktaConfig{
			ClientID:   "0oa5y4z0bpdDTPOo05d7",
			OktaDomain: "dev-8636097.okta.com",
		}
	}
	return config
}

func getStateFromUserContext(userContext supertokens.UserContext) string {
	// Fetching the state from the request query params, update the logic as per your needs
	// State is generated from the front end, and it needs to be persisted between the
	// AuthorisationRedirectURIGET and SignInUpPOST API calls
	req := getRequestFromUserContext(userContext)
	return req.URL.Query().Get("state")
}
