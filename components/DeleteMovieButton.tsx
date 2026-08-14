"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function DeleteMovieButton({ id }: { id: number }) {
  const router = useRouter();

  async function deleteMovie() {
    if (!confirm("Delete this movie?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("movies").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    router.refresh();
  }

  return <button className="btn btn-danger" onClick={deleteMovie}>Delete</button>;
}
