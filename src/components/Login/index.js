import React, { useState } from 'react';
import './Login.css';
import history from '../history';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e){
    e.preventDefault();
    fetch(
      'https://candy-243011.firebaseapp.com/api/v1/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: email,
          password: password,
        }),
      }
    )
      .then(res => {
        if (res.status !== 200) {
          console.log('error')
        }
        else {
          res.json().then(data=>{
           localStorage.setItem('idToken', data.idToken)
           localStorage.setItem('refreshToken',data.refreshToken)
          })
       
        history.push(`/dashboard`);

        }
        
      })
      .catch()
  }
  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="title-text"> 2359 Candidate Portal</div>
        <div className="title-text-small">
          Please enter your credentials to proceed.
        </div>
        <div className="login-form">
        <form className="sign-up" onSubmit={handleLogin} >
        <label className="label-text">EMAIL ADDRESS</label>
        <input 
          className="input-custom"
          type="text"
          placeholder="email"
          onChange={e => onChangeEmail(e)}
          value={email}
        />
        <label className="label-text">PASSWORD</label>
        <input
         className="input-custom"
          type="password"
          placeholder="password"
          onChange={e => onChangePassword(e)}
          value={password}
        />
        <button className="sign-in-btn">Sign in</button>
      </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
