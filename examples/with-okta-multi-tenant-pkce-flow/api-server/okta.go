package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"github.com/supertokens/supertokens-golang/supertokens"
)

type OktaConfig struct {
	ClientID   string
	OktaDomain string
}

var oktaProvider = tpmodels.TypeProvider{
	ID:        "okta",
	IsDefault: true,
	Get: func(redirectURI, authCodeFromRequest *string, userContext supertokens.UserContext) tpmodels.TypeProviderGetResponse {
		req := getRequestFromUserContext(userContext)
		tenantId := getTenantIdFromRequest(req)
		config := getOktaConfigForTenantId(tenantId)

		st, err := supertokens.GetInstanceOrThrowError()
		if err != nil {
			panic(err)
		}
		oktaRedirectURI := st.AppInfo.WebsiteDomain.GetAsStringDangerous() + st.AppInfo.WebsiteBasePath.GetAsStringDangerous() + "/callback/okta"

		// Optional: Adding tenantId to the user context so that it can be added to accessTokenPayload while creating new session
		(*userContext)["tenantId"] = tenantId

		if authCodeFromRequest == nil {
			empty := ""
			authCodeFromRequest = &empty
		}

		// `state` is generated from the frontend and passed to the backend, so that
		// we can create a challenge for the authorisation redirect and later
		// use the same verifier assoicated with the state during signinup to provide
		// proof for the PKCE flow.
		state := getStateFromRequest(req)

		// As explained above, we need to create or get the verifier associated with the state
		verifier := getOrCreateVerifierForState(state)

		return tpmodels.TypeProviderGetResponse{
			AuthorisationRedirect: tpmodels.AuthorisationRedirect{
				URL: fmt.Sprintf("https://%s/oauth2/default/v1/authorize", config.OktaDomain),
				Params: map[string]interface{}{
					"scope":                 "openid email",
					"response_type":         "code",
					"client_id":             config.ClientID,
					"state":                 state,
					"redirect_uri":          oktaRedirectURI,
					"code_challenge":        verifier.CodeChallengeS256(),
					"code_challenge_method": "S256",
				},
			},

			AccessTokenAPI: tpmodels.AccessTokenAPI{
				URL: fmt.Sprintf("https://%s/oauth2/default/v1/token", config.OktaDomain),
				Params: map[string]string{
					"client_id":     config.ClientID,
					"grant_type":    "authorization_code",
					"code":          *authCodeFromRequest,
					"code_verifier": verifier.Value,
					"redirect_uri":  oktaRedirectURI,
				},
			},

			GetClientId: func(userContext supertokens.UserContext) string {
				return config.ClientID
			},

			GetRedirectURI: func(userContext supertokens.UserContext) (string, error) {
				return oktaRedirectURI, nil
			},

			GetProfileInfo: func(authCodeResponse interface{}, userContext supertokens.UserContext) (tpmodels.UserInfo, error) {
				oauthTokens := authCodeResponse.(map[string]interface{})
				authToken := oauthTokens["access_token"].(string)
				userInfoAPIURL := fmt.Sprintf("https://%s/oauth2/default/v1/userinfo", config.OktaDomain)

				userInfoRequest, err := http.NewRequest("GET", userInfoAPIURL, nil)
				userInfoRequest.Header.Set("Authorization", fmt.Sprintf("Bearer %s", authToken))
				if err != nil {
					return tpmodels.UserInfo{}, err
				}
				userInfoResponse, err := doGetRequest(userInfoRequest)
				if err != nil {
					return tpmodels.UserInfo{}, err
				}
				userInfoMap := userInfoResponse.(map[string]interface{})

				// Appending TenantID to the ID returned by Okta as we do not have support
				// for multiple user pools yet (for one core). This modification simulates
				// multiple user pools and allows the same user to login across multiple tenants.
				ID := userInfoMap["sub"].(string) + "+" + tenantId

				email := userInfoMap["email"].(string)
				if email == "" {
					return tpmodels.UserInfo{
						ID: ID,
					}, nil
				}
				isVerified, isVerifiedOk := userInfoMap["email_verified"].(bool)
				return tpmodels.UserInfo{
					ID: ID,
					Email: &tpmodels.EmailStruct{
						ID:         email,
						IsVerified: isVerified && isVerifiedOk,
					},
				}, nil
			},
		}
	},
}

func doGetRequest(req *http.Request) (interface{}, error) {
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		return nil, fmt.Errorf("provider API returned response with status `%s` and body `%s`", resp.Status, string(body))
	}

	var result interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}
