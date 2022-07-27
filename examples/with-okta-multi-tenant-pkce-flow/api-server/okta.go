package main

import (
	"crypto/rand"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"

	"github.com/supertokens/supertokens-golang/recipe/thirdparty/tpmodels"
	"github.com/supertokens/supertokens-golang/supertokens"

	verifier "github.com/nirasan/go-oauth-pkce-code-verifier"
)

type OktaConfig struct {
	ClientID     string
	ClientSecret string
	OktaDomain   string
}

var oktaVerifiers = sync.Map{}

func newState() string {
	const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	bytes := make([]byte, 64)
	if _, err := rand.Read(bytes); err != nil {
		return ""
	}

	for i, b := range bytes {
		bytes[i] = chars[b%byte(len(chars))]
	}
	return string(bytes)
}

var oktaProvider = tpmodels.TypeProvider{
	ID:        "okta",
	IsDefault: true,
	Get: func(redirectURI, authCodeFromRequest *string, userContext supertokens.UserContext) tpmodels.TypeProviderGetResponse {
		config, _ := (*userContext)["oktaConfig"].(OktaConfig)
		// tenantId, _ := (*userContext)["tenantId"].(string)
		oktaRedirectURI, _ := (*userContext)["redirectURI"].(string)

		if authCodeFromRequest == nil {
			empty := ""
			authCodeFromRequest = &empty
		}

		state, _ := (*userContext)["state"].(string)
		v, _ := verifier.CreateCodeVerifier()
		verifierValue, _ := oktaVerifiers.LoadOrStore(state, v.Value) // save this to DB?
		v.Value = verifierValue.(string)

		return tpmodels.TypeProviderGetResponse{
			AuthorisationRedirect: tpmodels.AuthorisationRedirect{
				URL: fmt.Sprintf("https://%s/oauth2/default/v1/authorize", config.OktaDomain),
				Params: map[string]interface{}{
					"scope":                 "openid email",
					"response_type":         "code",
					"client_id":             config.ClientID,
					"state":                 state,
					"redirect_uri":          oktaRedirectURI,
					"code_challenge":        v.CodeChallengeS256(),
					"code_challenge_method": "S256",
				},
			},
			AccessTokenAPI: tpmodels.AccessTokenAPI{
				URL: fmt.Sprintf("https://%s/oauth2/default/v1/token", config.OktaDomain),
				Params: map[string]string{
					"client_id":     config.ClientID,
					"grant_type":    "authorization_code",
					"code":          *authCodeFromRequest,
					"code_verifier": v.Value,
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
				ID := userInfoMap["sub"].(string)
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
		return nil, errors.New(fmt.Sprintf("Provider API returned response with status `%s` and body `%s`", resp.Status, string(body)))
	}

	var result interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}
	return result, nil
}
