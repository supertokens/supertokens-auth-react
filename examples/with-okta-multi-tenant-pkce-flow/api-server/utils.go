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
