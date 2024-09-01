import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginOrRegister } from "../store/slices/userSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [getUser, setGetUser] = useState(false);

  const user = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const user = localStorage.getItem("token-movie");
    if (user) {
      dispatch(loginOrRegister(JSON.parse(user)));
    }
    setGetUser(true);
  }, []);

  if (getUser) {
    return (
      <>{Boolean(user.user.username) ? children : <Navigate to={"/login"} />}</>
    );
  }
};

export default ProtectedRoute;
