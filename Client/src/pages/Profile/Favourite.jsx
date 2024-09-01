import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayCards from "../../components/DisplayCards";
import NotAvailableFavourites from "../../components/NotAvailableFavourites";
import { favouriteFailure, favouriteSuccess } from "../../store";

const Favourite = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.user;
  });

  const favourites = useSelector((state) => {
    return state.favourites;
  });

  const apiKey = `d8d0bca9bbe0ddf613286684fa77259c`;

  return (
    <div className="profile-favourites dotted-border">
      {favourites.error ? (
        <NotAvailableFavourites error="yes" />
      ) : favourites.favourites.length == 0 ? (
        <NotAvailableFavourites favourites="zero" error="no" />
      ) : (
        <DisplayCards data={favourites.favourites} swiper="not-include" />
      )}
    </div>
  );
};

export default Favourite;
