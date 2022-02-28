import "./register.css";

import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const history = useHistory();
  //console.log({ history });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post(
          "https://metachain-social.herokuapp.com/api/v1/auth/register",
          user
        );
        history.push("/login");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Lamasocial</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              type="email"
              required
              ref={email}
              className="registerInput"
            />
            <input
              placeholder="Password"
              type="password"
              minLength="5"
              required
              ref={password}
              className="registerInput"
            />
            <input
              placeholder="Confirm Password"
              required
              type="password"
              ref={confirmPassword}
              className="registerInput"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
                textAlign: "center",
              }}
              to="/login">
              <button className="registerRegisterButton" type="submit">
                Log into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
