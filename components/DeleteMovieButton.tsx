"use client";

import { useRouter } from "next/navigation";
import { createBrowserSideClient } from "@/lib/supabase/client";

export function DeleteMovieButton({ id }: { id: number }) {
  const router = useRouter();

  async function deleteMovie() {
    if (!confirm("Delete this movie?")) return;
    const supabase = createBrowserSideClient();
    const { error } = await supabase.from("movies").delete().eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    router.refresh();
  }

  return <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" onClick={deleteMovie}>Delete</button>;
}
