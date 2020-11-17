import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {getSuperTokensRoutesForReactRouterDom} from 'supertokens-auth-react';
import {SignInAndUp, ResetPasswordUsingToken} from 'supertokens-auth-react/recipe/emailpassword';
import {BaseComponent, Home, About, Contact, Dashboard} from './App';
import SignInAndUpCustom from './themes/signInAndUp';

function AppWithReactDomRouter() {

  return (
    <div className="App">
      <Router>
        <Nav/> 
        <h1>With Routing</h1>
        <a href="/home?router=no-router">Switch</a><br/>
        <BaseComponent>
          <Switch>
            {getSuperTokensRoutesForReactRouterDom()}
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/custom-supertokens-login">
              <SignInAndUp 
                  onHandleSuccess={async (context) => {
                    if (context.status === "SIGN_IN_COMPLETE" || context.status === "SIGN_UP_COMPLETE") {
                      console.log(`ST_CALLBACKS onHandleSuccess ${context.status} email:${context.user.email}`);
                    } else {
                      console.log(`ST_CALLBACKS onHandleSuccess ${context.status}`);
                    }
                    return true;
                  }}
              />
            </Route>
            <Route path="/session-exist">
              <SignInAndUp
                doesSessionExist={async () => {
                  return window.confirm("ST_CALLBACKS Does session exist?")
                }}
                onHandleSuccess={(context) => {
                  
                  return window.confirm(`onHandleSuccess call ${context.action}, onHandleSuccess?`);
                }}
              />
            </Route>
            <Route exact path="/custom/auth/">
              <SignInAndUp
            
                // DO NOT MODIFY: Used for tests
                doesSessionExist={async () => {
                  console.log(`ST_CALLBACKS Does session exist props session:${getCookie("isLoggedIn") !== undefined}`);

                  return getCookie("isLoggedIn") !== undefined;
                }}

                // DO NOT MODIFY: Used for tests
                onHandleForgotPasswordClicked={async() => {
                  console.log("ST_CALLBACKS will redirect to ForgotPassword");
                  window.location.href = "/custom/auth/reset-password";
                  return true;
                }}
            
                // DO NOT MODIFY: Used for tests
                onCallSignUpAPI={async (requestJson, headers) => {
                  console.log(`ST_CALLBACKS onCallSignUpAPI, email:${requestJson.formFields[0].value} password:${requestJson.formFields[1].value} rid:${headers.rid}`);
                  return {
                    status: "OK",
                    user: {
                      id: "1",
                      email: "john.doe@supertokens.io"
                    }
                  }
                }}

                // DO NOT MODIFY: Used for tests
                onHandleSuccess={async (context) => {
                  if (context.action === "SIGN_IN_COMPLETE" || context.action === "SIGN_UP_COMPLETE") {
                    console.log(`ST_CALLBACKS onHandleSuccess ${context.action} email:${context.user.email} id:${context.user.id}`);
                  } else {
                    console.log(`ST_CALLBACKS onHandleSuccess ${context.action}`);
                  }
                  window.location.href = "/custom-success-redirect";
                  return true;
                }}
            
                // DO NOT MODIFY: Used for tests
                onCallSignInAPI={async (requestJson, headers) => {
                  console.log(`ST_CALLBACKS onCallSignInAPI, email:${requestJson.formFields[0].value} password:${requestJson.formFields[1].value} rid:${headers.rid}`);
                  setCookie("isLoggedIn", true);
                  return {
                    status: "OK",
                    user: {
                        id: "1",
                        email: "john.doe@supertokens.io"
                    }
                  }
                }}

              />
            </Route>
            <Route exact path="/custom/auth/reset-password">
              <ResetPasswordUsingToken
                  // DO NOT MODIFY: Used for tests
                  onHandleSuccess={async (context) => {
                    console.log(`ST_CALLBACKS onHandleSuccess ${context.action}`);
                    window.location.href = "/custom-success-redirect";
                    return true;
                  }}

                  // DO NOT MODIFY: Used for tests
                  onCallSubmitNewPasswordAPI={async (requestJson, headers) => {
                      console.log(`ST_CALLBACKS onCallSubmitNewPasswordAPI, password:${requestJson.formFields[0].value} token:${requestJson.token}`);
                      return {
                          status: "OK"
                      }
                  }}

                  // DO NOT MODIFY: Used for tests
                  onCallSendResetEmailAPI={async (requestJson, headers) => {
                      console.log(`ST_CALLBACKS onCallSendResetEmailAPI,  email:${requestJson.formFields[0].value}`);
                      // If successfully sent reset password email.
                      return {
                          status: "OK"
                      }
                }}
              />
            </Route>
            <Route path="/custom-theme">
              <SignInAndUp >
                <SignInAndUpCustom/>
              </SignInAndUp >
            </Route>
          </Switch>
        </BaseComponent>
      </Router>
    </div>
  );
}

function Nav () {
  return (
    <div className="header__menu menu">
    <div className="menu__icon icon-menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav className="menu__body">
      <ul className="menu__list">
        <li key="home"><Link  className="menu__link" style={{ textDecoration: 'none' }} to="/">Home</Link></li>
        <li key="about"><Link className="menu__link" style={{ textDecoration: 'none' }} to="/about">About</Link></li>
        <li key="contact"><Link className="menu__link" style={{ textDecoration: 'none' }} to="/contact">Contact</Link></li>
        <li key="auth"><Link className="menu__link" style={{ textDecoration: 'none' }} to="/auth">Auth</Link></li>
        <li key="custom"><Link className="menu__link" style={{ textDecoration: 'none' }} to="/custom-supertokens-login">Custom route</Link></li>
        <li key="custom2"><a className="menu__link" style={{ textDecoration: 'none' }} href="/dashboard">Dashboard (Logged In)</a></li>
        <li key="custom6"><a className="menu__link" style={{ textDecoration: 'none' }} href="/auth/reset-password">Reset Password</a></li>
        <li key="custom3.1"><a className="menu__link" style={{ textDecoration: 'none' }} href="/custom/auth/">Custom login (props)</a></li>
        <li key="custom3.2"><a className="menu__link" style={{ textDecoration: 'none' }} href="/custom/auth/reset-password">Custom reset (props)</a></li>
        <li key="custom4"><a className="menu__link" style={{ textDecoration: 'none' }} href="/custom-theme">Custom theme</a></li>
        <li key="custom5"><a className="menu__link" style={{ textDecoration: 'none' }} href="/session-exist">Session already exist.</a></li>
      </ul>
    </nav>
  </div>
  )
}
/*
 * Helpers
 * From https://www.w3schools.com/js/js_cookies.asp
 */ 

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}

export default AppWithReactDomRouter;
