import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import "./CSS/toast.css";
import { useEffect } from "react";

// Pages
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import Search from "./pages/Search/Search";
import EachMovieDetail from "./pages/EachMovieDetail/EachMovieDetail";
import Layout from "./pages/Layout/Layout";
import ProfileLayout from "./pages/Layout/ProfileLayout";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import UpdatePassword from "./pages/Profile/UpdatePassword";
import Favourite from "./pages/Profile/Favourite";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { favouriteFailure, favouriteStart, favouriteSuccess } from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import { loginOrRegister } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user.user;
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/user/get-favourites/${user._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log("data", data);
      if (response.ok) {
        dispatch(favouriteSuccess(data.favourites));
      } else {
        dispatch(favouriteFailure());
      }
    };
    if (Boolean(user._id)) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="app">
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route
              path="movies"
              // element={isLoggedIn ? <Movies /> : <Navigate to={"/login"} />}
              element={<ProtectedRoute children={<Movies />} />}
            />
            <Route
              path="tv-shows"
              element={<ProtectedRoute children={<TVShows />} />}
            />
            <Route
              path="movie/:id"
              element={<ProtectedRoute children={<EachMovieDetail />} />}
            />
            <Route
              path="tv-show/:id"
              element={<ProtectedRoute children={<EachMovieDetail />} />}
            />
            <Route
              path="search/:name"
              element={<ProtectedRoute children={<Search />} />}
            />
            <Route
              path="profile"
              // element={
              //   isLoggedIn ? <ProfileLayout /> : <ProfileLayout />
              //   // <Navigate to={"/login"} />
              // }
              element={<ProtectedRoute children={<ProfileLayout />} />}
            >
              <Route index element={<UpdateProfile />} />
              <Route path="favourites" element={<Favourite />} />
              <Route path="update-password" element={<UpdatePassword />} />
              {/* <Route path='log-out' element={<Logout />} /> */}
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
