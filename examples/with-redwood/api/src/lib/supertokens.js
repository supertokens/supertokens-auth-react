const SuperTokens = require('supertokens-node')
const Session = require('supertokens-node/recipe/session')
const EmailPassword = require('supertokens-node/recipe/emailpassword')
const websiteDomain = 'http://localhost:8910'

SuperTokens.init({
  supertokens: {
    connectionURI: 'https://try.supertokens.io',
  },
  appInfo: {
    appName: 'SuperTokens Demo App',
    apiDomain: 'http://localhost:8910',
    websiteDomain,
    apiBasePath: '/api/auth',
  },
  recipeList: [
    EmailPassword.init({
      emailVerificationFeature: {
        mode: 'REQUIRED',
      },
    }),
    Session.init(),
  ],
})

export function getRWAllCORSHeaders() {
  return {
    'Access-Control-Allow-Origin': 'http://localhost:8910',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': [
      'content-type',
      ...SuperTokens.getAllCORSHeaders(),
    ].join(','),
    'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'DELETE'].join(','),
  }
}
