import { WatchedMovie } from "./WatchedMovie";

export function WatchedMoviesList({ watched, deleteWachedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          deleteWachedMovie={deleteWachedMovie}
        />
      ))}
    </ul>
  );
}
