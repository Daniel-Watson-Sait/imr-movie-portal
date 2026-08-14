import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Movie } from "@/types/movie";
import { DeleteMovieButton } from "@/components/DeleteMovieButton";

export default async function MoviesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("movies").select("*").order("title");
  const movies = (data ?? []) as Movie[];

  return (
    <section className="page">
      <div className="container">
        <div className="hero">
          <div>
            <h1>Movie Database</h1>
            <p className="subtitle">Add, edit, and delete movies in the IMR database.</p>
          </div>
          <Link className="btn btn-primary" href="/movies/new">+ Add Movie</Link>
        </div>

        {error && <div className="notice error">Supabase error: {error.message}</div>}

        <div className="movie-grid">
          {movies.length === 0 && !error ? (
            <div className="card">No movies found. Add your first movie.</div>
          ) : (
            movies.map((movie) => (
              <div className="card movie-row" key={movie.id}>
                <div className="movie-title">{movie.title}</div>
                <div className="actors">{movie.actors.join(", ")}</div>
                <div className="year">{movie.release_year}</div>
                <div className="actions">
                  <Link className="btn btn-secondary" href={`/movies/${movie.id}/edit`}>Edit</Link>
                  <DeleteMovieButton id={movie.id} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
