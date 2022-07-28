package main

import (
	"sync"

	verifier "github.com/nirasan/go-oauth-pkce-code-verifier"
)

var oktaVerifiers = sync.Map{}

func getOrCreateVerifierForState(state string) *verifier.CodeVerifier {
	v, _ := verifier.CreateCodeVerifier()
	verifierValue, _ := oktaVerifiers.LoadOrStore(state, v.Value)
	v.Value = verifierValue.(string)
	return v
}
