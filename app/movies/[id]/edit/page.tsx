import { createServerSideClient } from "@/lib/supabase/server";
import EditMovieForm from "@/components/EditMovieForm";

export default async function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createServerSideClient();

  const { data: movie, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", Number(id))
    .single();
  
  if (error || !movie) {
    return <div className="p-6">Movie not found.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Movie</h1>
      <EditMovieForm movie={movie} />
    </div>
  );
}
