export function Movie({ movie,setMovieIdHandler }) {
  return (
    <li onClick={()=>{setMovieIdHandler(movie.imdbID)}}>
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
      <h2>{movie.Title}</h2>
      <div>
        <span>🗓</span>
        <p>{movie.Year}</p>
      </div>
    </li>
  );
}
