import { AppProps, ErrorComponent, useRouter, AuthenticationError, AuthorizationError } from "blitz"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { queryCache } from "react-query"
import SuperTokensReact from "supertokens-auth-react"
import SuperTokensNode from "supertokens-node"
import * as SuperTokensConfig from "../config/supertokensConfig"

if (typeof window !== "undefined") {
  SuperTokensReact.init(SuperTokensConfig.frontendConfig())
} else {
  SuperTokensNode.init(SuperTokensConfig.backendConfig())
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
        /* prettier-ignore */
        statusCode={(error as any).statusCode}
        /* prettier-ignore */
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        /* prettier-ignore */
        statusCode={(error as any)?.statusCode || 400}
        /* prettier-ignore */
        title={error?.message || error?.name}
      />
    )
  }
}
