import React from 'react'
import Session from 'supertokens-auth-react/recipe/session'
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword'
import Logout from '../../components/Home/Logout'
import SuccessView from '../../components/Home/SuccessView'

const HomePage = () => {
  const userId = Session.getUserId()

  async function logoutClicked() {
    await EmailPassword.signOut()
    // TODO Use proper redwood redirection method.
    window.Location.href = '/auth'
  }

  return (
    <div className="fill">
      <Logout logoutClicked={logoutClicked} />
      <SuccessView userId={userId} />
    </div>
  )
}

const HomePageWrapper = () => {
  return (
    <EmailPassword.EmailPasswordAuth>
      <HomePage />
    </EmailPassword.EmailPasswordAuth>
  )
}
export default HomePageWrapper
