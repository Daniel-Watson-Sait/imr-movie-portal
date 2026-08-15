import Link from "next/link";
import { createServerSideClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createServerSideClient();

  const { data: movies } = await supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">🎥 Movie Portal</h1>
        <p className="text-lg text-gray-700 mb-10">
          Browse movies
        </p>

        <div className="flex gap-4 justify-center mb-12">
          <Link
            href="/movies"
            className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
          >
            View Movies
          </Link>

        </div>

        {/* Featured Movies */}
        <h2 className="text-2xl font-semibold mb-4">Latest Movies</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {movies?.map((movie) => (
            <Link
              key={movie.id}
              href="/movies"
              className="border rounded p-4 bg-white shadow hover:shadow-lg transition"
            >
              {movie.image_url && (
                <img
                  src={movie.image_url}
                  alt={movie.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-gray-600">{movie.release_year}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
