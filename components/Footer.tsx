import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Company Information */}
          <div>
            <h2 className="text-lg font-bold text-white">
              IMR
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Internet Movies Rental provides a simple and convenient
              way to manage and explore our movie collection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/movies"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Movies
              </Link>

              <Link
                href="/movies/new"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Add Movie
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <div className="mt-3 space-y-2 text-sm text-slate-400">
              <p>123 Movie Street</p>
              <p>Calgary, AB, Canada</p>
              <p>
                <a
                  href="mailto:info@imr.ca"
                  className="transition hover:text-white"
                >
                  info@imr.ca
                </a>
              </p>
              <p>
                <a
                  href="tel:+14035551234"
                  className="transition hover:text-white"
                >
                  (403) 555-1234
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-slate-700 pt-6 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Internet Movies Rental Company.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}