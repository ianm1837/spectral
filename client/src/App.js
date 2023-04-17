import React, { useEffect } from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthService from './utils/auth';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AuthService.loggedIn() ? setIsLoggedIn(true) : setIsLoggedIn(false);
    console.log("isLoggedIn: ", isLoggedIn)
  }, [isLoggedIn])

  return (
      <Routes> 
        <Route path="/" element={isLoggedIn ? <Home title={'Self-hosted Messaging'}/> : <Navigate replace to={"/login"} />} />
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={isLoggedIn ? <Navigate replace to={"/"} /> : <Login />} /> 
        <Route path="/signup" element={isLoggedIn ? <Navigate replace to={"/"} /> : <Signup />} />
        <Route path="*" element={<Navigate replace to={"/"} />} />
      </Routes> 
  );
}

export default App;


