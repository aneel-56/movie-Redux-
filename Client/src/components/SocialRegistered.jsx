import React from "react";

const SocialRegistered = () => {
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
    borderRadius: "0",
  };

  return (
    <div style={style} className="dotted-border">
      <h1
        style={{
          padding: "2em",
          fontSize: "1.2rem",
          textAlign: "center",
          textWrap: "justify",
        }}
      >
        You registered through your social, so you can't change the password
      </h1>
    </div>
  );
};

export default SocialRegistered;
