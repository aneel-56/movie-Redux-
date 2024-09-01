import React from "react";

const NotAvailableFavourites = ({ error, favourites }) => {
  console.log("error", error, favourites);
  const style = {
    backgroundColor: "#0b0f29",
    paddingBlock: "3em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "1em",
    borderRadius: "1em",
    color: "white",
    width: "100%",
    height: "100%",
  };
  return (
    <div style={style}>
      {/* No {item} available */}
      {error === "yes" ? (
        <>
          <p>Some Error Occured</p>
        </>
      ) : (
        <>
          <p>You have zero Favourites. Add Some!</p>
        </>
      )}
    </div>
  );
};

export default NotAvailableFavourites;
