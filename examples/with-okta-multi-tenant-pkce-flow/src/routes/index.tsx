import {useState} from 'react';

export default function Index() {

  const [tenant, setTenant] = useState('');

  function handleClick(e: any) {
    e.preventDefault();
    window.localStorage.setItem('tenant', tenant);
    window.location.href = `http://multitenant.com:3000/auth`
  }

  return (
    <div className="home">
      <main className="auth">
        <h1>Proceed to Login</h1>
        <div className="tenant-input">
          <input type="text" placeholder="tenant-id" value={tenant} onChange={(e)=>setTenant(e.target.value)} />
          {/* <span>.multitenant.com</span> */}
        </div>
        <div style={{ marginTop: "24px" }}>
          <a href="#" className="btn" onClick={handleClick}>Login</a>
        </div>
      </main>
    </div>
  );
}