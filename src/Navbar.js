export function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <div>
        <input className="search" type="text" placeholder="Search movies..." />
      </div>
      <p className="num-results">Found X results</p>
    </nav>
  );
}
