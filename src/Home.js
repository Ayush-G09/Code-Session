import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
import { gapi } from 'gapi-script';

const Home = () => {

  let nav = useNavigate();
  var newWindow = window;

  const clientId = '1054259671222-ga7ig2f1614hchemcul61nhp34eo72ku.apps.googleusercontent.com';
  
  async function redirectToGoogle() {
    const googleLoginUrl = "https://code-sessions-backend.onrender.com/auth/google";
    newWindow = window.open(googleLoginUrl, "_blank", "width=500, height=600");
  }

  async function Login() {
    var emailID = document.getElementById('emailid').value;
    var password = document.getElementById('passid').value;
    var data = {emailID: emailID, password: password};
    const request = await axios.post('https://code-sessions-backend.onrender.com/teacherlogin', data);
    if(request.data.code === 200)
    {
      alert("Loged in.");
      sessionStorage.setItem("email", request.data.emailID);
      sessionStorage.setItem("id", request.data.id);
      sessionStorage.setItem("jwt", request.data.jwt);
      sessionStorage.setItem("role", request.data.role);
      sessionStorage.setItem("setrole", "true");
      nav('/Dashboard');
      console.log(request.data.jwt);
      console.log(request)
    }
    else
    {
      alert("Worng Credentials");
    }
  }

  async function Glog() {
    const req = await axios.get('https://code-sessions-backend.onrender.com/auth/google');
    console.log(req)
  }

  return (
    <>
    <div className="MainContainer">
      <div className="LoginContainer" id="loginid">
        <div className="lc1">
          <h1>SignIn</h1>
        </div>
        <div className="lc2">
          <input className="inputbox" type="text" placeholder="Email" id="emailid" />
        </div>
        <div className="lc3">
          <input className="inputbox" type="password" placeholder="Password" id="passid"/>
        </div>
        <div className="lc4">
          <div className="loginbtn">
            <span onClick={() => Login()}>Login</span>
          </div>
        </div>
        <div className="lc5">
          <span>
          </span>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;