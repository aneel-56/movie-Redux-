import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Navbar.css";
import { loginOrRegister } from "../store/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    // console.log("state", state);
    return state.user;
  });

  // console.log("user", user);

  const isLoggedIn = user.user.length != 0;

  const [search, setSearch] = useState(false);
  const [display, setDisplay] = useState(false);

  const [movieName, setMovieName] = useState("");

  const handleChange = () => {
    setDisplay((prevState) => {
      setSearch(false);
      return !prevState;
    });
  };

  const handleSearch = () => {
    setSearch((prevState) => {
      setDisplay(false);
      return !prevState;
    });
  };

  return (
    <header>
      <div>
        <NavLink to="/" end>
          <img src="/movix.png" alt="" />
          <h2>Netflix</h2>
        </NavLink>
      </div>

      <div className="mobile-search-films">
        {search ? (
          <div className="mobile-search-films-input">
            <input
              type="text"
              name="movie-search-input"
              min={2}
              id="movie-search-input"
              placeholder="Enter a movie-name"
              className=""
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
            <button disabled={!movieName}>
              <NavLink to={"/search/" + movieName} end>
                Search
              </NavLink>
            </button>
          </div>
        ) : (
          ""
        )}
        <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
      </div>

      <form className="laptop-search-films">
        <NavLink to={`search/` + movieName} end>
          <i className="fa-solid fa-magnifying-glass"></i>
        </NavLink>
        <input
          type="text"
          placeholder="Search Movie Name from here"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
      </form>

      <ul className="hamburger" onClick={handleChange}>
        <span></span>
        <span></span>
        <span></span>
      </ul>

      {display ? (
        <ul className="mobile-navbar">
          <li>
            <NavLink to="/movies" end>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/tv-shows" end>
              TV Shows
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink to={`/profile`} end>
                Profile
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/login" end>
                Login
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/register" end>
                Register
              </NavLink>
            </li>
          )}
        </ul>
      ) : (
        ""
      )}

      <ul className="laptop-navbar">
        <li>
          <NavLink to="/movies" end>
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/tv-shows" end>
            TV Shows
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink to="/login" end>
              Login
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to="/register" end>
              Register
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to={`/profile`} end>
              Profile
            </NavLink>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
