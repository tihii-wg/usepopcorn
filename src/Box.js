import { MovieList } from "./MovieList";

export function Box({ movies }) {
  return (
    <div className="box">
      <MovieList movies={movies} />
    </div>
  );
}
