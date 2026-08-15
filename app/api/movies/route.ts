import { NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createServerSideClient();
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .order("title");
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
