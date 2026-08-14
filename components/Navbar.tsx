import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / Company Name */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          IMR
          <span className="ml-2 text-sm font-medium text-slate-500">
            Internet Movies Rental
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            href="/movies"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Movies
          </Link>

          <Link
            href="/movies/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add Movie
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
