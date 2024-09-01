import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.css";
import { useDispatch } from "react-redux";
import { loginOrRegister } from "../../store/slices/userSlice";

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

// firebase Auth
import { FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { TwitterAuthProvider } from "firebase/auth";

// import firebase from '../../utils/firebase'

const Register = () => {
  // console.log("app", app);

  const auth = getAuth(app);
  const twitterProvider = new TwitterAuthProvider();
  const gitProvider = new GithubAuthProvider();
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  // console.log("provider", app);
  // console.log("gitProvider", gitProvider);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [error, setError] = useState();

  const [disabled, setDisabled] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e);
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          mobile: phone,
          password,
          socialLogin: true,
        }),
        credentials: "include",
      });
      const data = await response.json();
      console.log("response", response);
      console.log("data", data);
      if (response.ok) {
        dispatch(loginOrRegister(data));
        localStorage.setItem("token-movie", JSON.stringify(data));
        navigate("/");
      }
      if (!response.ok) {
        setError(data.error);
      }
    } catch (error) {
      console.log("error", error);
      setError(error.message);
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
        const { displayName, email, phoneNumber, photoURL } = user;

        const response = await fetch(
          "http://localhost:3000/user/social-register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: displayName,
              email,
              phone: phoneNumber,
              photo: photoURL,
              socialLogin: true,
            }),
          }
        );
        const data = await response.json();
        console.log("data", data);
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
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleFacebook = () => {
    signInWithPopup(auth, fbProvider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;

        console.log("user", user);
        const { displayName, email, phoneNumber, photoURL } = user;

        const response = await fetch(
          "http://localhost:3000/user/social-register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: displayName,
              email,
              phone: phoneNumber,
              photo: photoURL,
              socialLogin: true,
            }),
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

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const handleGit = () => {
    console.log("user register");
    signInWithPopup(auth, gitProvider)
      .then(async (result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        console.log("token", token);

        // The signed-in user info.
        const user = result.user;
        console.log("user", user);

        const { displayName, email, phoneNumber, photoURL } = user;

        const response = await fetch(
          "http://localhost:3000/user/social-register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: displayName,
              email,
              phone: phoneNumber,
              photo: photoURL,
              socialLogin: true,
            }),
          }
        );
        const data = await response.json();
        console.log("register", response);
        if (response.ok) {
          dispatch(loginOrRegister(data));
          setError("");
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
        console.log("user", user);

        let { displayName, email, phoneNumber, photoURL } = user;
        if (!email) {
          email = "random1@gmail.com";
        }

        const response = await fetch(
          "http://localhost:3000/user/social-register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              social: "twitter",
              username: displayName,
              email,
              phone: phoneNumber,
              photo: photoURL,
              socialLogin: true,
            }),
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
    const ok =
      username.trim().length > 3 &&
      email.endsWith(".com") &&
      password.length > 7 &&
      phone.length > 6;
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
  }, [username, email, phone, password]);

  return (
    <div className="register">
      <div className="register-hero">
        <img src="/movix.png" alt="" />
        <h2>Register</h2>
      </div>
      <div className="register-forms">
        <form action="" onSubmit={handleSubmit}>
          <div className="register-form-div">
            <i className="fa-solid fa-lock"></i>
            <input
              type="text"
              name=""
              id=""
              placeholder="Username"
              autoComplete="no"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            <i className="fa-solid fa-phone"></i>
            <input
              type="text"
              name=""
              id=""
              placeholder="Phone-Number"
              autoComplete="no"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            Register
          </button>
          <button type="button" onClick={handleGoogle}>
            <i className="fa-brands fa-google"></i> Register with Google
          </button>
          <button type="button" onClick={handleFacebook}>
            <i className="fa-brands fa-facebook"></i> Register with Facebook
          </button>
          <button type="button">
            <i className="fa-brands fa-instagram" disabled></i> Register with
            Instagram
          </button>
          <button type="button" onClick={handleTwitter}>
            <i className="fa-brands fa-twitter" disabled></i> Register with
            Twitter
          </button>
          <button type="button" onClick={handleGit}>
            <i className="fa-brands fa-github" disabled></i> Register with
            Github
          </button>
          <div>
            <p>
              Already a member? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
