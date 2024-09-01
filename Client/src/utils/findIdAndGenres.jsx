const idAndGenres = [
  { id: 28, genre: "Action" },
  { id: 12, genre: "Adventure" },
  { id: 16, genre: "Animation" },
  { id: 35, genre: "Comedy" },
  { id: 80, genre: "Crime" },
  { id: 99, genre: "Documentary" },
  { id: 18, genre: "Drama" },
  { id: 10751, genre: "Family" },
  { id: 14, genre: "Fantasy" },
  { id: 36, genre: "History" },
  { id: 27, genre: "Horror" },
  { id: 10402, genre: "Music" },
  { id: 9648, genre: "Mystery" },
  { id: 10749, genre: "Romance" },
  { id: 878, genre: "Science Fiction" },
  { id: 10770, genre: "TV Movie" },
  { id: 53, genre: "Thriller" },
  { id: 10752, genre: "War" },
  { id: 37, genre: "Western" },
];

const findGenresById = (genreIds) => {
  const foundGenres = idAndGenres.filter((genre) =>
    genreIds.includes(genre.id)
  );
  return foundGenres
    .map((genre) => (
      <span
        key={Math.random()}
        style={{
          display: "inline",
          textAlign: "right",
          marginInline: "0.2em",
          marginTop: "0",
          backgroundColor: "#da2f68",
          wordBreak: "keep-all",
          color: "white",
          padding: "0.1em",
          borderRadius: "0.2em",
          fontSize: "0.65rem",
        }}
      >
        {genre.genre}
      </span>
    ))
    .slice(0, 3);
};

export default findGenresById;
