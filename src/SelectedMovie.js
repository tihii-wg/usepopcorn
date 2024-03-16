import { useEffect, useState } from "react";
import { key } from "./key";

export function SelectedMovie({
  selectedMovieId,
  cancelSelectedMovieHandler,
  movies,
}) {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  console.log(title, year);

  useEffect(
    function () {
      async function GetMovieDitals() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
          );
          const data = await res.json();
          setMovie(data);
          console.log(movie);
          if (!res.ok) throw new Error("error");
        } catch (err) {
          console.log(err.message);
          // const selectedMovie = movies.find(
          //   (movie) => movie.imdbID === selectedMovieId
          // );
        }
      }

      GetMovieDitals();
    },
    [selectedMovieId]
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={cancelSelectedMovieHandler}>
          ⬅
        </button>
        <img src={poster} alt={`Poster of ${title} movie.`} />
        <div className="details-overviev">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring: {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
