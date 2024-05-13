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
import { useLocalStorageState } from "./useLocalStorageState";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([],"watched");
  //  const [watched, setWatched] = useState([]);

  const setMovieIdHandler = (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const cancelSelectedMovieHandler = () => {
    setSelectedMovieId(null);
  };

  const handleAddWatchedMovie = (selectedMovie) => {
    setWatched((wached) => [...wached, selectedMovie]);

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
