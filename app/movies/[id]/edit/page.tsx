import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MovieForm } from "@/components/MovieForm";
import type { Movie } from "@/types/movie";
export default async function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.from("movies").select("*").eq("id", id).single();
  if (error || !data) notFound();
  return <section className="page"><div className="container"><div className="hero"><div><h1>Edit Movie</h1><p className="subtitle">Update the selected movie.</p></div></div><MovieForm movie={data as Movie} /></div></section>;
}
