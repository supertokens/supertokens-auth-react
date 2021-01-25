import ReactDOM from 'react-dom'
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import SuperTokens from 'supertokens-auth-react'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Session from 'supertokens-auth-react/recipe/session'
import Routes from 'src/Routes'
import './index.css'

SuperTokens.init({
  appInfo: {
    appName: 'SuperTokens',
    websiteDomain: 'localhost:8910',
    apiDomain: 'localhost:8911',
  },
  recipeList: [EmailPassword.init(), Session.init()],
})

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider>
      <Routes />
    </RedwoodProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
