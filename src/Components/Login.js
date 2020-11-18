import React from 'react';
import { loginUrl } from '../services/spotify';
import Header from './Header'

function Login() {
  return (
      <div className="login">
      <Header />
      <a className="login__button" href={loginUrl}>LOGIN TO SPOTIFY</a>
    </div>
  );
}

export default Login;
