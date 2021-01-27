import { AppProps, ErrorComponent, useRouter, AuthenticationError, AuthorizationError } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"
import SuperTokensReact from "supertokens-auth-react";
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
import SuperTokensNode from "supertokens-node"
import SessionNode from "supertokens-node/recipe/session"
import EmailPasswordNode from "supertokens-node/recipe/emailpassword"


if (typeof window !== "undefined") {
    SuperTokensReact.init({
        appInfo: {
            appName: "SuperTokens Demo Blitz",
            websiteDomain: "http://localhost:3000",
            apiDomain: "http://localhost:3000",
            apiBasePath: "/api/auth"
        },
        recipeList: [
            EmailPasswordReact.init({
                emailVerificationFeature: {
                    mode: "REQUIRED"
                }
            }),
            SessionReact.init()
        ]
    });
} else {
  SuperTokensNode.init({
    supertokens: {
      connectionURI: "https://try.supertokens.io",
    },
    appInfo: {
      appName: "SuperTokens Demo App",
      apiDomain: "http://localhost:3000",
      websiteDomain: "http://localhost:3000",
      apiBasePath: "/api/auth"
    },
    recipeList: [
      EmailPasswordNode.init({
      }),
      SessionNode.init()
    ],
  });
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
    window.location.href = "/auth"; // Redirect to login form.
    return null;
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
