import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieData from "./MovieData";
import TopCast from "./TopCast";
import Similar from "./Similar";
import Recommendation from "./Recommendation";
import OfficialVideos from "./OfficialVideos";

import "./EachMovieDetail.css";
import NotAvailable from "../../components/NotAvailable";
import Loading from "../../components/Loading";
const imagePath = `https://image.tmdb.org/t/p/w500/`;

const EachMovieDetail = () => {
  const { id } = useParams();

  const apiKey = `d8d0bca9bbe0ddf613286684fa77259c`;

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState([]);
  console.log(data.videos, credits);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?external_source=imdb_id&api_key=${apiKey}`
      );
      const video = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
      );
      const credits = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
      );
      const data = await response.json();
      const videoData = await video.json();
      const creditsData = await credits.json();
      setLoading(false);

      if (response.ok) {
        setData(data);
        setVideos(videoData.results);
        setCredits(creditsData);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="movie-detail">
      {loading ? (
        <Loading />
      ) : data.length != 0 ? (
        <Fragment>
          <div className="movie-detail-backdrop">
            <div className="each-movie-upper-backdrop" />
            <div className="each-movie-right-backdrop" />
            <div className="each-movie-lower-backdrop" />
            <div className="each-movie-left-backdrop" />
            <img src={imagePath + data.backdrop_path} alt="" />
            <img
              src={imagePath + data.backdrop_path}
              alt=""
              className="mobile-movie-detail-backdrop"
            />
          </div>
          <MovieData
            data={data}
            poster_path={`${data.backdrop_path}`}
            backdrop_path={data.backdrop_path}
            crew={credits.crew}
          />
          <TopCast cast={credits} />
          <OfficialVideos id={id} videos={videos} />
          <Similar id={id} />
          <Recommendation id={id} />
        </Fragment>
      ) : (
        <NotAvailable item="Data" full="yes" />
      )}
    </div>
  );
};

export default EachMovieDetail;
