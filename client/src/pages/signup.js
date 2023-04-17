import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import AuthService from '../utils/auth';


export default function Login() {
  const [createAccount, { data, loading, error }] = useMutation(ADD_USER);


  const [usernameField, setUsernameField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  function handleInputChange(event) {

    if (event.code === 'Enter') {
      GetLoginToken(event);
    }

    const { name, value } = event.target;
    if (name === 'username') {
      setUsernameField(value);
    } else if (name === 'password') {
      setPasswordField(value);
    }
  }

  const GetLoginToken = async (event) => {

    event.preventDefault();
    if (!usernameField || !passwordField) {
      return false;
    }

    const signupData = await createAccount({ variables: {username: usernameField, password: passwordField}})

    console.log(signupData)

    const tokenData = signupData.data.createUser.token;

    // use the AuthService to log in the user and redirect to the homepage
    AuthService.login(tokenData)
  }

  return (
  <div className="flex justify-center items-center h-full">
    <div className="card h-min w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create Account</h2>
        <input name="username" value={usernameField} type="text" placeholder="Username" onChange={handleInputChange} className="input input-bordered input-secondary w-full max-w-xs" />
        <input name="password" value={passwordField} type="password" placeholder="Password" onChange={handleInputChange} onKeyUp={handleInputChange} className="input input-bordered input-secondary w-full max-w-xs" />

        <div className="card-actions flex flex-row justify-between items-center">
          <button onClick={GetLoginToken} className="btn btn-primary">Login</button>
          <a href="/login" className="link link-secondary">Login Instead</a>
        </div>
      </div>
    </div>
  </div>
  );
}