import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function MoviesPage() {
  const supabase = await createClient();

  return (
    <main>
    </main>
  );
}