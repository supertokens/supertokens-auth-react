package main

import (
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
	err := supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: "https://try.supertokens.com",
		},
		AppInfo: supertokens.AppInfo{
			AppName: "Demo",
			// TODO: Change this to your app's API and Website domain
			WebsiteDomain: "http://multitenant.com:3000",
			APIDomain:     "http://multitenant.com:8000",
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
			}),
		},
	})
	if err != nil {
		panic(err)
	}

	router := mux.NewRouter()

	http.ListenAndServe("0.0.0.0:8000", handlers.CORS(
		handlers.AllowedHeaders(append([]string{"Content-Type"}, supertokens.GetAllCORSHeaders()...)),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"http://multitenant.com:3000"}),
		handlers.AllowCredentials(),
	)(supertokens.Middleware(router)))
}
