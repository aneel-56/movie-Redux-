import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginOrRegister } from "../../store/slices/userSlice";

const Hero = () => {
  const dispatch = useDispatch();

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const imagePath = "https://image.tmdb.org/t/p/w500/";
  const apiKey = "d8d0bca9bbe0ddf613286684fa77259c";
  const trendingMoviesURI = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(trendingMoviesURI);
        if (response.ok) {
          const data = await response.json();
          setTrendingMovies(data.results);
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("token-movie");

    if (user) {
      dispatch(loginOrRegister(JSON.parse(user)));
    }
  }, []);

  return (
    <main className="hero">
      <div className="upper-opacity-layer" />
      <div className="right-opacity-layer" />
      <div className="lower-opacity-layer" />
      <div className="left-opacity-layer" />
      <div className="hero-bg">
        {trendingMovies.length > 0 && (
          <img
            src={
              imagePath +
              trendingMovies[Math.floor(Math.random() * trendingMovies.length)]
                .backdrop_path
            }
            alt=""
          />
        )}
      </div>

      <div className="hero-form">
        <h1>Welcome</h1>
        <p>
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
        <div>
          <input
            type="text"
            placeholder="Search for a movie or TV show...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to={searchQuery.length > 0 ? `/search/${searchQuery}` : "/"}>
            Search
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Hero;
