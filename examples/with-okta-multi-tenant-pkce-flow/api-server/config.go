package main

import (
	"net/http"
	"sync"

	verifier "github.com/nirasan/go-oauth-pkce-code-verifier"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func initSupertokens() {
	err := supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: "https://try.supertokens.com",
		},
		AppInfo: supertokens.AppInfo{
			AppName: "Demo",
			// TODO: Change this to your app's API and Website domain
			WebsiteDomain: "http://localhost:3000",
			APIDomain:     "http://localhost:8000",
		},
		RecipeList: []supertokens.Recipe{
			session.Init(&sessmodels.TypeInput{
				Jwt: &sessmodels.JWTInputConfig{
					Enable: true,
				},
				Override: &sessmodels.OverrideStruct{
					Functions: sessionFunctionsOverride,
				},
			}),
			thirdparty.Init(&tpmodels.TypeInput{
				SignInAndUpFeature: tpmodels.TypeInputSignInAndUp{
					Providers: []tpmodels.TypeProvider{
						oktaProvider,
					},
				},
				Override: &tpmodels.OverrideStruct{
					APIs: apiOverride,
				},
			}),
		},
	})
	if err != nil {
		panic(err)
	}
}

func getTenantIdFromRequest(req *http.Request) string {
	// Fetching the tenantId from the request query params, update the logic as per your needs
	return req.URL.Query().Get("tenant")
}

func getOktaConfigForTenantId(tenantId string) OktaConfig {
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

func getStateFromRequest(req *http.Request) string {
	// Fetching the state from the request query params, update the logic as per your needs
	// State is generated from the front end, and it needs to be persisted between the
	// AuthorisationRedirectURIGET and SignInUpPOST API calls
	return req.URL.Query().Get("state")
}

// Inmemory map to store verifiers for states.
// TODO You will need to persist this in the database instead.
var thirdPartyVerifiers = sync.Map{}

func getOrCreateVerifierForState(state string) *verifier.CodeVerifier {
	// TODO Since we are using the PKCE code flow, we need to persist the verifier for the state
	// so that we can use it to verify the code returned from Okta. This mapping must be saved
	// in the database.
	v, _ := verifier.CreateCodeVerifier()
	verifierValue, _ := thirdPartyVerifiers.LoadOrStore(state, v.Value)
	v.Value = verifierValue.(string)
	return v
}

func revokeVerifierForState(state string) {
	// TODO Remove the verifier from the database once done
	thirdPartyVerifiers.Delete(state)
}
