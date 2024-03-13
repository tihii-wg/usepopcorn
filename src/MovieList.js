import { Movie } from "./Movie";

export function MovieList({ movies, setMovieIdHandler }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setMovieIdHandler={setMovieIdHandler}
        />
      ))}
    </ul>
  );
}
