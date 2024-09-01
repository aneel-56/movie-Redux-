import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./LoginRegister.css";
import { loginOrRegister } from "../../store/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";

// firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_e3QBBV275Oa_DdQ4pUiBISO4OF_1o10",
  authDomain: "movie-with-redux.firebaseapp.com",
  projectId: "movie-with-redux",
  storageBucket: "movie-with-redux.appspot.com",
  messagingSenderId: "771269427273",
  appId: "1:771269427273:web:96993034ca8ea6850b7f98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";

// import firebase from '../../utils/firebase'

const Login = () => {
  const auth = getAuth(app);
  const twitterProvider = new TwitterAuthProvider();
  const gitProvider = new GithubAuthProvider();
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [error, setError] = useState();
  const [disabled, setDisabled] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const user = useSelector((state) => {
  //   return state.user.user;
  // });

  // console.log("user", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e);
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      console.log("response", response);
      console.log("data", data);
      if (response.ok) {
        dispatch(loginOrRegister(data));
        localStorage.setItem("token-movie", JSON.stringify(data));
        navigate("/");
      } else {
        setError(data.error);
        toast.error("Login Failed");
      }
    } catch (error) {
      setError(error.message);
      console.log("error", error);
    }
  };

  const handleGoogle = async (e) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user", user);
        const { email } = user;

        const response = await fetch(
          "http://localhost:3000/user/social-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch(loginOrRegister(data));
          localStorage.setItem("token-movie", JSON.stringify(data));
          navigate("/");
        } else if (!response.ok) {
          setError(data.error);
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleFacebook = () => {
    signInWithPopup(auth, fbProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user", user);
        const { email } = user;

        const response = await fetch(
          "http://localhost:3000/user/social-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch(loginOrRegister(data));
          localStorage.setItem("token-movie", JSON.stringify(data));
          navigate("/");
        } else if (!response.ok) {
          setError(data.error);
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleGit = () => {
    console.log("git user");
    signInWithPopup(auth, gitProvider)
      .then(async (result) => {
        console.log("result", result);
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log("user", user);

        const { email } = user;

        const response = await fetch(
          "http://localhost:3000/user/social-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch(loginOrRegister(data));
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/");
        } else if (!response.ok) {
          setError(data.error);
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("error", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleTwitter = () => {
    signInWithPopup(auth, twitterProvider)
      .then(async (result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;

        // The signed-in user info.
        const user = result.user;

        console.log("username", user);
        const { displayName: username } = user;

        const response = await fetch(
          "http://localhost:3000/user/social-login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ social: "twitter", username }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          dispatch(loginOrRegister(data));
          localStorage.setItem("token-user", JSON.stringify(data));
          navigate("/");
        } else if (!response.ok) {
          setError(data.error);
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;

        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(() => {
    const ok = email.endsWith(".com") && password.length > 7;
    if (ok == !disabled) {
      return;
    }
    if (ok) {
      console.log("true");
      setDisabled(false);
      return;
    } else if (!ok) {
      console.log("false");
      setDisabled(true);
      return;
    }
  }, [email, password]);

  return (
    <div className="register">
      <div className="register-hero">
        <img src="/movix.png" alt="" />
        <h2>Login</h2>
      </div>
      <div className="register-forms">
        <form action="" onSubmit={handleSubmit}>
          <div className="register-form-div">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="text"
              name=""
              id=""
              placeholder="Email"
              autoComplete="no"
              required
              username={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register-form-div">
            <i className="fa-solid fa-lock"></i>
            <input
              type="text"
              name=""
              id=""
              placeholder="Password"
              autoComplete="no"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>}

          <button
            type="submit"
            disabled={disabled}
            style={{ opacity: disabled ? "0.8" : "1" }}
          >
            Login
          </button>
          <button type="button" onClick={handleGoogle}>
            <i className="fa-brands fa-google"></i> Login with Google
          </button>
          <button type="button" onClick={handleFacebook}>
            <i className="fa-brands fa-facebook"></i> Login with Facebook
          </button>
          <button type="button">
            <i className="fa-brands fa-instagram" disabled></i> Login with
            Instagram
          </button>
          <button type="button" onClick={handleTwitter}>
            <i className="fa-brands fa-twitter" disabled></i> Login with Twitter
          </button>
          <button type="button" onClick={handleGit}>
            <i className="fa-brands fa-github" disabled></i> Login with Github
          </button>
          <div>
            <p>
              Not a member? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
