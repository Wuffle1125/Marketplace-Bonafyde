import React from "react";

import "./loginModal.css";
import { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInSuccess,
  signOutSuccess,
} from "../../../persistence/users/UserReducer";

const LoginModal = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (res) => {
      if (res.access_token) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${res.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${res.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            dispatch(signInSuccess(res.data));
            setProfile(res.data);
            navigate("/market");
          })
          .catch((err) => console.log(err));
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    dispatch(signOutSuccess());
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
