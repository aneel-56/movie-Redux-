import React from "react";

const NotAvailable = ({ item, full, favourites }) => {
  let screen = full;
  if (full == undefined) {
    screen = "no";
  }
  console.log("screen", screen);
  const style = {
    backgroundColor: "#0b0f29",
    paddingBlock: "3em",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "1em",

    alignItems: "center",
    borderRadius: "1em",
    color: "white",
    width: "100%",
    height: screen == "yes" ? "70vh" : "250px",
  };

  return (
    <div style={style}>
      No {item} available
      {screen == "yes" && (
        <>
          {" "}
          <br /> <p>Please, Resort Back</p>
        </>
      )}
    </div>
  );
};

export default NotAvailable;
