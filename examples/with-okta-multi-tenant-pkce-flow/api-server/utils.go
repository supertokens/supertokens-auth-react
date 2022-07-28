package main

import (
	"sync"

	verifier "github.com/nirasan/go-oauth-pkce-code-verifier"
)

var oktaVerifiers = sync.Map{}

func getOrCreateVerifierForState(state string) *verifier.CodeVerifier {
	// Since we are using the PKCE code flow, we need to persist the verifier for the state
	// so that we can use it to verify the code returned from Okta. This mapping must be saved
	// in the database.
	v, _ := verifier.CreateCodeVerifier()
	verifierValue, _ := oktaVerifiers.LoadOrStore(state, v.Value)
	v.Value = verifierValue.(string)
	return v
}
