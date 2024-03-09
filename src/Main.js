import { Box } from "./Box";

export function Main({ movies }) {
  return (
    <main className="main">
      <Box movies={movies} />
      <Box />
    </main>
  );
}

