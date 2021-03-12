import { AppProps, ErrorComponent, useRouter, AuthenticationError, AuthorizationError } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"
import SuperTokensReact from "supertokens-auth-react"
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword"
import SessionReact from "supertokens-auth-react/recipe/session"
import SuperTokensNode from "supertokens-node"
import SessionNode from "supertokens-node/recipe/session"
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword"

if (typeof window !== "undefined") {
  SuperTokensReact.init({
    useReactRouterDom: false,
    appInfo: {
      appName: "SuperTokens Demo Blitz",
      websiteDomain: "http://localhost:3000",
      apiDomain: "http://localhost:3000",
      apiBasePath: "/api/auth",
    },
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [
            ThirdPartyEmailPasswordReact.Facebook.init(),
            ThirdPartyEmailPasswordReact.Google.init(),
            ThirdPartyEmailPasswordReact.Github.init(),
          ],
        },
        emailVerificationFeature: {
          mode: "REQUIRED",
        },
      }),
      SessionReact.init(),
    ],
  })
} else {
  SuperTokensNode.init({
    supertokens: {
      connectionURI: "https://try.supertokens.io",
    },
    appInfo: {
      appName: "SuperTokens Demo Blitz",
      apiDomain: "http://localhost:3000",
      websiteDomain: "http://localhost:3000",
      apiBasePath: "/api/auth",
    },
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        providers: [
          ThirdPartyEmailPasswordNode.Google({
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            clientId: process.env.GOOGLE_CLIENT_ID as string,
          }),
          ThirdPartyEmailPasswordNode.Github({
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            clientId: process.env.GITHUB_CLIENT_ID as string,
          }),
          ThirdPartyEmailPasswordNode.Facebook({
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
          }),
        ],
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  })
}

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  if (error instanceof AuthenticationError) {
    window.location.href = "/auth" // Redirect to login form.
    return null
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={(error as any).statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error?.message || error?.name}
      />
    )
  }
}
