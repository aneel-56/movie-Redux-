import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import NotAvailable from "../../components/NotAvailable";

const OfficialVideos = ({ videos }) => {
  console.log("videos", videos);

  return (
    <div className="each-movie-official-videos">
      <h2 style={{ color: "white" }}>Official Videos</h2>
      <div className="all-official-videos">
        {videos.length > 0 ? (
          videos.map((each) => {
            const videoUrl = `https://www.youtube.com/watch?v=${each.key}`;
            return (
              <div key={each.key} className="each-video-wrapper">
                <ReactPlayer
                  url={videoUrl}
                  controls={true}
                  className="each-video"
                  width="100%"
                  height="100%"
                  playing={false}
                  muted={true}
                />
              </div>
            );
          })
        ) : (
          <NotAvailable item="Videos" />
        )}
      </div>
    </div>
  );
};

export default OfficialVideos;
