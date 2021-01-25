import { Fragment, useEffect, useState } from 'react'
import SuperTokens from 'supertokens-auth-react'
import '../../index.css'
import Footer from '../../components/Footer/index'
const AuthPage = () => {
  const [, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      window.location.href = '/'
    }
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', onLocationChange)
  }, [setCurrentPath])

  return (
    <Fragment>
      <div className="fill">{SuperTokens.getRoutingComponent()}</div>
      <div className="footer">
        <Footer />
      </div>
    </Fragment>
  )
}

export default AuthPage
