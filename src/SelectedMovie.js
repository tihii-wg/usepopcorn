import { useEffect, useState } from "react";
import { key } from "./key";
import { StarRating } from "./StarRating";
import { Loader } from "./Loader";

export function SelectedMovie({
  selectedMovieId,
  cancelSelectedMovieHandler,
  handleAddWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [movieRating, setMovieRating] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAdd = () => {
    const newMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: movieRating,
    };
    handleAddWatchedMovie(newMovie);
  };

  useEffect(
    function () {
      async function GetMovieDitals() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
          );
          const data = await res.json();
          setMovie(data);
          if (!res.ok) throw new Error("error");
        } catch (err) {
          // const selectedMovie = movies.find(
          //   (movie) => movie.imdbID === selectedMovieId
          // );
        } finally {
          setIsLoading(false);
        }
      }

      GetMovieDitals();
    },
    [selectedMovieId]
  );


  useEffect(
    function () {
      if (!title) return;
      document.title = title;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      function callBack(e) {
        if (e.code === "Escape") {
          cancelSelectedMovieHandler();
        }
      }
      document.addEventListener("keydown", callBack);

      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [cancelSelectedMovieHandler]
  );

  const isWatched = watched.find(
    (watched) => watched.imdbID === selectedMovieId
  );
  //	watched
  // .map((movie) => movie.imdbID)
  // .includes(selectedMovieId);
  const watchedUserRating = watched.find(
    (watched) => watched.imdbID === selectedMovieId
  )?.userRating;

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size="15"
                    setMovieRating={setMovieRating}
                  />
                  {movieRating && (
                    <button className="addButton" onClick={handleAdd}>
                      Add Movie To list..
                    </button>
                  )}
                </>
              ) : (
                <p>
                  in list,rated {watchedUserRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
