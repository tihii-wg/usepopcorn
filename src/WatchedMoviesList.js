import { WatchedMovie } from "./WatchedMovie";

export function WatchedMoviesList({ movies }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
