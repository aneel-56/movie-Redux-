import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayCards from "../../components/DisplayCards";

const Search = () => {
  const params = useParams();

  const { name } = params;

  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${params.name}&api_key=d8d0bca9bbe0ddf613286684fa77259c&page=${page}`
      );
      const data = await response.json();
      console.log("data", data);
      setData(data.results);
    };
    fetchData();
  }, [name, page]);

  const handlePage = (clickPage) => {
    setPage((prevState) => {
      return clickPage;
    });
  };

  if (data.length != 0) {
    return (
      <div style={{ padding: "1em" }} className="search">
        <h1 style={{ color: "white" }}>Search Result for "{params.name}"</h1>
        <DisplayCards data={data} path="/" swiper="not-include" />
        <div className="movies-button">
          {page - 2 > 0 && (
            <button onClick={() => handlePage(page - 2)}>{page - 2}</button>
          )}
          {page - 1 > 0 && (
            <button onClick={() => handlePage(page - 1)}>{page - 1}</button>
          )}
          <button
            style={{ background: "red" }}
            onClick={() => handlePage(page)}
          >
            {page}
          </button>
          <button onClick={() => handlePage(page + 1)}>{page + 1}</button>
          <button onClick={() => handlePage(page + 2)}>{page + 2}</button>
        </div>
      </div>
    );
  }
};

export default Search;
