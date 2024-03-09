export function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} Poster`} />
      <h2>{movie.Title}</h2>
      <div>
        <span>🗓</span>
        <p>{movie.Year}</p>
      </div>
    </li>
  );
}
