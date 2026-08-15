import { createServerSideClient } from "@/lib/supabase/server";
import {DeleteMovieButton} from "@/components/DeleteMovieButton";
import Link from "next/link";

export default async function MoviesPage() {
  const supabase = await createServerSideClient();

  const { data: movies, error } = await supabase
    .from("movies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div>Error loading movies.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Movies</h1>

      <Link
        href="/movies/new"
        className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add New Movie
      </Link>

      <ul className="space-y-4">
        {movies?.map((movie) => (
          <li key={movie.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600">{movie.release_year}</p>
            <p>{movie.actors?.join(", ")}</p>

            <div className="flex gap-3 mt-4">
              <Link
                href={`/movies/${movie.id}/edit`}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              <DeleteMovieButton id={movie.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
