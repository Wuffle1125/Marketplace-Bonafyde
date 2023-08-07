import React from "react";

import "./loginModal.css";
import { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      navigate("/market");
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div className="">
      <div className="login_single_modal">
        <h5 className=" text-light mb-5">
          The easiest way and most secure to store our physical NFT assets.
        </h5>

        <div className="input__item mb-3 text-light">
          <h4>Sign up or Sign in</h4>
        </div>

        <input type="text" className="newsletter_login" />

        <button className="place__bid-btn">Continue</button>

        <div className="input__item mb-3 text-light text-center mt-3">
          <h4>Or</h4>
        </div>

        <button
          className="place__bid-btn"
          style={{ backgroundColor: "#343444" }}
          onClick={() => login()}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
