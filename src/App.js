import "./App.css";
import { useEffect, useState } from "react";
import { Main } from "./Main";
import { MovieList } from "./MovieList";
import { Navbar } from "./Navbar";
import { Box } from "./Box";
import { WatchedMoviesList } from "./WatchedMoviesList";
import { WatchedSummary } from "./WatchedSummary";
import { Search } from "./Search";
import { NumResult } from "./NumResult";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { SelectedMovie } from "./SelectedMovie";
import { key } from "./key";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const setMovieIdHandler = (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const cancelSelectedMovieHandler = () => {
    setSelectedMovieId(null);
  };

  const handleAddWatchedMovie = (selectedMovie) => {
    setWatched((movie) => [...movie, selectedMovie]);
    setSelectedMovieId(null);
  };

  const deleteWachedMovie = (id) => {
    setWatched((watched) => watched.filter((watched) => watched.imdbID !== id));
  };

  useEffect(
    function () {
      const controller = new AbortController();

      async function fecthingData() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Sumthing wrong");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      cancelSelectedMovieHandler();
      fecthingData();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div className="app">
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!error && !isLoading && (
            <MovieList movies={movies} setMovieIdHandler={setMovieIdHandler} />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <SelectedMovie
              key={key}
              watched={watched}
              selectedMovieId={selectedMovieId}
              cancelSelectedMovieHandler={cancelSelectedMovieHandler}
              handleAddWatchedMovie={handleAddWatchedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                deleteWachedMovie={deleteWachedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

export default App;
