import React, {useState} from 'react';
import { signOut } from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";
import axios from 'axios'

Session.addAxiosInterceptors(axios);

const getTenantId = () => {
  return window.location.hostname.split('.')[0]
}

export default function Dashboard() {
  async function onLogout() {
    await signOut();
    window.location.href = "http://multitenant.com:3000";
  }

  let sessionContext = Session.useSessionContext();

  if (sessionContext.loading) {
    return null
  }

  return (
    <div className="home">
      <main className="dashboard">
        <h1>Dashboard</h1>
        <pre style={{textAlign: "left"}}>{ sessionContext.accessTokenPayload.jwt }</pre>
        <a href="#" onClick={onLogout} className="btn">Logout</a>
      </main>
    </div>
  );
}
