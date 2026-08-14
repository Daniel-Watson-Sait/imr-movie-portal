import Link from "next/link";

export function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/">IMR Movie Rental</Link>
        <nav className="nav-links">
          <Link className="nav-link" href="/movies">Movies</Link>
          <Link className="nav-link" href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
