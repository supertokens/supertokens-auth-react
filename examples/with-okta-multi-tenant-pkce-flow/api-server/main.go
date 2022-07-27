package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty"
	"github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func main() {
	apiBasePath := "/auth"
	websiteBasePath := "/auth"

	err := supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: "http://localhost:3567",
			APIKey:        "someKey",
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "Emailpassword Demo",
			WebsiteDomain:   "http://multitenant.com:3000",
			APIDomain:       "http://multitenant.com:8000",
			WebsiteBasePath: &websiteBasePath,
			APIBasePath:     &apiBasePath,
		},
		RecipeList: []supertokens.Recipe{
			session.Init(&sessmodels.TypeInput{
				Jwt: &sessmodels.JWTInputConfig{
					Enable: true,
				},
				Override: &sessmodels.OverrideStruct{
					Functions: func(originalImplementation sessmodels.RecipeInterface) sessmodels.RecipeInterface {
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
					},
				},
			}),
			thirdparty.Init(&tpmodels.TypeInput{
				SignInAndUpFeature: tpmodels.TypeInputSignInAndUp{
					Providers: []tpmodels.TypeProvider{
						oktaProvider,
					},
				},
				Override: &tpmodels.OverrideStruct{
					APIs: func(originalImplementation tpmodels.APIInterface) tpmodels.APIInterface {
						oAuthUrlGET := *originalImplementation.AuthorisationUrlGET
						nAuthUrlGET := func(provider tpmodels.TypeProvider, options tpmodels.APIOptions, userContext supertokens.UserContext) (tpmodels.AuthorisationUrlGETResponse, error) {
							addTenantInfoToUserContext(options.Req, userContext)
							return oAuthUrlGET(provider, options, userContext)
						}
						*originalImplementation.AuthorisationUrlGET = nAuthUrlGET

						oSignInUpPOST := *originalImplementation.SignInUpPOST
						nSignInUpPOST := func(provider tpmodels.TypeProvider, code string, authCodeResponse interface{}, redirectURI string, options tpmodels.APIOptions, userContext supertokens.UserContext) (tpmodels.SignInUpPOSTResponse, error) {
							addTenantInfoToUserContext(options.Req, userContext)
							return oSignInUpPOST(provider, code, authCodeResponse, redirectURI, options, userContext)
						}
						*originalImplementation.SignInUpPOST = nSignInUpPOST
						return originalImplementation
					},

					Functions: func(originalImplementation tpmodels.RecipeInterface) tpmodels.RecipeInterface {
						oSignInUp := *originalImplementation.SignInUp
						nSignInUp := func(thirdPartyID string, thirdPartyUserID string, email tpmodels.EmailStruct, userContext supertokens.UserContext) (tpmodels.SignInUpResponse, error) {
							tenantId := (*userContext)["tenantId"].(string)

							thirdPartyUserID = thirdPartyUserID + "+" + tenantId
							return oSignInUp(thirdPartyID, thirdPartyUserID, email, userContext)
						}
						*originalImplementation.SignInUp = nSignInUp

						return originalImplementation
					},
				},
			}),
		},
	})
	if err != nil {
		panic(err)
	}

	router := mux.NewRouter()

	router.HandleFunc("/sessioninfo", session.VerifySession(nil, sessioninfo)).Methods(http.MethodGet)

	http.ListenAndServe("0.0.0.0:8000", handlers.CORS(
		handlers.AllowedHeaders(append([]string{"Content-Type"}, supertokens.GetAllCORSHeaders()...)),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"http://multitenant.com:3000", "http://tenant1.multitenant.com:3000", "http://tenant2.multitenant.com:3000"}),
		handlers.AllowCredentials(),
	)(supertokens.Middleware(router)))
}

func addTenantInfoToUserContext(req *http.Request, userContext supertokens.UserContext) {
	var config OktaConfig
	var oktaRedirectURI string
	tenantId := req.URL.Query().Get("tenant")
	oktaRedirectURI = "http://multitenant.com:3000/auth/callback/okta"

	switch tenantId {
	case "tenant1":
		config = OktaConfig{
			ClientID:   "0oa5y2vfqhrTPAX8Q5d7",
			OktaDomain: "dev-8636097.okta.com",
		}
		break

	case "tenant2":
		config = OktaConfig{
			ClientID:   "0oa5y4z0bpdDTPOo05d7",
			OktaDomain: "dev-8636097.okta.com",
		}
		break
	}

	(*userContext)["oktaConfig"] = config
	(*userContext)["tenantId"] = tenantId
	(*userContext)["redirectURI"] = oktaRedirectURI
	(*userContext)["state"] = req.URL.Query().Get("state")
}

func sessioninfo(w http.ResponseWriter, r *http.Request) {
	sessionContainer := session.GetSessionFromRequestContext(r.Context())

	if sessionContainer == nil {
		w.WriteHeader(500)
		w.Write([]byte("no session found"))
		return
	}
	sessionData, err := sessionContainer.GetSessionData()
	if err != nil {
		err = supertokens.ErrorHandler(err, r, w)
		if err != nil {
			w.WriteHeader(500)
			w.Write([]byte(err.Error()))
		}
		return
	}
	w.WriteHeader(200)
	w.Header().Add("content-type", "application/json")
	bytes, err := json.Marshal(map[string]interface{}{
		"sessionHandle":      sessionContainer.GetHandle(),
		"userId":             sessionContainer.GetUserID(),
		"accessTokenPayload": sessionContainer.GetAccessTokenPayload(),
		"sessionData":        sessionData,
	})
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte("error in converting to json"))
	} else {
		w.Write(bytes)
	}
}
