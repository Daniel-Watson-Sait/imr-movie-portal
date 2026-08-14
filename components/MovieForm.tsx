"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Movie } from "@/types/movie";

export function MovieForm({ movie }: { movie?: Movie }) {
  const router = useRouter();
  const [title, setTitle] = useState(movie?.title ?? "");
  const [actors, setActors] = useState(movie?.actors.join(", ") ?? "");
  const [releaseYear, setReleaseYear] = useState(String(movie?.release_year ?? ""));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const supabase = createClient();
    const payload = {
      title: title.trim(),
      actors: actors.split(",").map((actor) => actor.trim()).filter(Boolean),
      release_year: Number(releaseYear),
    };

    if (!payload.title || !payload.release_year || payload.actors.length === 0) {
      setError("Please enter a title, at least one actor, and a release year.");
      setSaving(false);
      return;
    }

    const result = movie
      ? await supabase.from("movies").update(payload).eq("id", movie.id)
      : await supabase.from("movies").insert(payload);

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.push("/movies");
    router.refresh();
  }

  return (
    <form className="card form-card" onSubmit={submit}>
      {error && <div className="notice error">{error}</div>}
      <div className="form-group">
        <label className="label" htmlFor="title">Title</label>
        <input className="input" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Movie title" />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="actors">Actors</label>
        <input className="input" id="actors" value={actors} onChange={(e) => setActors(e.target.value)} placeholder="Actor 1, Actor 2, Actor 3" />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="releaseYear">Release Year</label>
        <input className="input" id="releaseYear" type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} placeholder="2026" />
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : movie ? "Save Changes" : "Add Movie"}</button>
        <button type="button" className="btn btn-secondary" onClick={() => router.push("/movies")}>Cancel</button>
      </div>
    </form>
  );
}
