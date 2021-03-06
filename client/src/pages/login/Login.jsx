import React, { useContext, useRef } from "react";
import "./login.css";
import { UserContext } from "../../context/UserContext";
import { loginCall } from "../../apiCall";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  // console.log(user);
  // console.log(isFetching);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MetaChain</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Email"
              ref={email}
              type="email"
              required
              className="loginInput"
            />
            <input
              placeholder="Password"
              ref={password}
              type="password"
              minLength="5"
              required
              className="loginInput"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" type="submit">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
