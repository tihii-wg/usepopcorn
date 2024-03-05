import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;

function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <div>
        <input className="search" type="text" placeholder="Search movies..." />
      </div>
      <div>Found X results</div>
    </nav>
  );
}
