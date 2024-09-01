import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutOrSignout } from "../../store/slices/userSlice";
import { toastFailure, toastSuccess } from "../../utils/toastify";
import { ToastContainer, toast } from "react-toastify";

const ProfileOptions = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user.user;
  });

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/logout");
      const data = await response.json();
      // console.log("logout", data)
      if (response.ok) {
        localStorage.removeItem("token-movie");
        dispatch(logoutOrSignout());
        toast("Successfully Logged Out", { ...toastSuccess });
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="profile-options dotted-border">
      <NavLink
        end
        style={({ isActive }) => {
          return {
            background: isActive ? "white" : "",
            color: isActive ? "red" : "",
          };
        }}
        to={""}
      >
        {/* <i className="fa-solid fa-gear"></i> */}
        <span className="material-symbols-outlined">account_circle</span>
        <h2>Update Profile</h2>
      </NavLink>
      <NavLink
        end
        style={({ isActive }) => {
          return {
            background: isActive ? "white" : "",
            color: isActive ? "red" : "",
          };
        }}
        to="favourites"
      >
        {/* <i className="fa-solid fa-heart"></i> */}
        <span className="material-symbols-outlined">favorite</span>
        <h2>Favourites Shows</h2>
      </NavLink>
      <NavLink
        end
        style={({ isActive }) => {
          return {
            background: isActive ? "white" : "",
            color: isActive ? "red" : "",
          };
        }}
        to="update-password"
      >
        {/* <i className="fa-solid fa-key"></i> */}
        <span className="material-symbols-outlined">lock</span>
        <h2>Update Password</h2>
      </NavLink>
      <button onClick={handleLogout}>
        {/* <i className="fa-solid fa-right-from-bracket"></i> */}
        <span className="material-symbols-outlined">logout</span>
        <h2>Log Out</h2>
      </button>
    </div>
  );
};

export default ProfileOptions;
