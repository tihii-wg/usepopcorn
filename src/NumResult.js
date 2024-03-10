export function NumResult({ movies }) {
	const numOfRes = movies?.length;
  return <p className="num-results">Found {numOfRes} results</p>;
}
