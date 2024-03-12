export function Search({ query, setQuery }) {
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
    </div>
  );
}
