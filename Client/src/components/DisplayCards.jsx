import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SwiperParent from "../utils/Swiper";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./DisplayCards.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import findGenresById from "../utils/findIdAndGenres";
import { useSelector } from "react-redux";
const imagePath = `https://image.tmdb.org/t/p/w500/`;

const DisplayCards = (props) => {
  const { data, swiper } = props;
  const includeSwiper = swiper === "include";

  const ids = useSelector((state) => {
    // console.log("state", state);
    return state.favourites.favourites;
  });

  const allIds = ids.map((each) => each.id);

  // console.log("ids", allIds);

  const total = data.map((each) => {
    const path =
      each["media_type"] == "movie"
        ? `/movie/${each.id}`
        : `/tv-show/${each.id}`;
    const imgPath = each.poster_path
      ? imagePath + each.poster_path
      : each.backdrop_path
      ? imagePath + each.backdrop_path
      : "/OIP.jpg";
    const includesIds = allIds.includes(`${each.id}`);
    // console.log("inlude", includesIds, each.id);
    if (!includeSwiper) {
      return (
        // <Link to={path} key={each.id} className="not-include-movie-card">
        <Link
          to={path}
          key={each.id}
          className="not-include-movie-card container"
        >
          <div
            className="each-card-favorite"
            onClick={() => handleAddFavourite(each.id)}
            style={{ right: "20px", top: "20px" }}
          >
            <i
              className="fa-solid fa-heart"
              style={{ color: includesIds ? "red" : "grey" }}
            ></i>
          </div>
          <img src={imgPath} alt="" />
          {/* <CircularProgressbar 
                text={each.vote_average}
                strokeWidth={12}
                value={each.vote_average}
                maxValue={10}
                minValue={0}
                styles={buildStyles({
                  pathColor: data.vote_average < 5 ? "red" : data.vote_average < 7 ? "orange" : "green",
                  textSize: "20px",
                  textColor: "black"
                })}
              /> */}
          <h3 className="primary-title">{each.name || each.title}</h3>
          <p className="secondary-title">
            {each.release_date || each.first_air_date || "Unknown-Date"}
          </p>
        </Link>
      );
    } else {
      return (
        <SwiperSlide key={each.id}>
          <Link to={path} key={each.id}>
            <div
              className="each-card-favorite"
              onClick={() => handleAddFavourite(each.id)}
            >
              <i
                className="fa-solid fa-heart"
                style={{ color: includesIds ? "red" : "grey" }}
              ></i>
            </div>
            <img src={imgPath} alt="" />
            <div className="each-card-stats">
              <div className="rating-bar">
                <CircularProgressbar
                  value={each.vote_average?.toFixed(1) ?? "NA"}
                  text={each.vote_average?.toFixed(1) ?? "NA"}
                  // text={each.vote_average.toFixed(1) || "NA"}
                  minValue={0}
                  maxValue={10}
                  strokeWidth={15}
                  styles={buildStyles({
                    pathColor:
                      each.vote_average < 5
                        ? "red"
                        : each.vote_average < 7
                        ? "orange"
                        : "green",
                    textSize: "25px",
                    textColor: "black",
                  })}
                />
              </div>
              <p className="genres-name">
                {Boolean(each.genre_ids)
                  ? findGenresById(each.genre_ids)
                  : "Not Avilable"}
              </p>
            </div>
            <h3 className="primary-title" style={{ marginTop: "14px" }}>
              {each.name || each.title}
            </h3>
            <p className="secondary-title">
              {each.release_date ?? each.first_air_date ?? "Unknown-Date"}
            </p>
          </Link>
        </SwiperSlide>
      );
    }
  });

  if (!includeSwiper) {
    return <div className="swiper-not-included">{total}</div>;
  } else {
    return <SwiperParent>{total}</SwiperParent>;
  }
};

export default DisplayCards;
