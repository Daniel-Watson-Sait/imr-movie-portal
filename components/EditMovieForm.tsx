"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSideClient } from "@/lib/supabase/client";

export default function EditMovieForm({ movie }: { movie: any }) {
  const router = useRouter();
  const supabase = createBrowserSideClient();

  const [title, setTitle] = useState(movie.title);
  const [releaseYear, setReleaseYear] = useState(String(movie.release_year));
  const [actors, setActors] = useState<string[]>(movie.actors || []);
  const [actorInput, setActorInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let image_url = movie.image_url;

    // If user uploads a new image, replace the old one
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("movies")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error(uploadError);
        alert("Image upload failed");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("movies")
        .getPublicUrl(fileName);

      image_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase
      .from("movies")
      .update({
        title,
        release_year: Number(releaseYear),
        actors,
        image_url,
      })
      .eq("id", movie.id);

    if (error) {
      console.error(error);
      alert("Error updating movie");
      return;
    }

    router.push("/movies");
  }

  function addActor() {
    if (!actorInput.trim()) return;
    setActors([...actors, actorInput.trim()]);
    setActorInput("");
  }

  function removeActor(index: number) {
    setActors(actors.filter((_, i) => i !== index));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Release Year */}
      <div>
        <label className="block font-medium mb-1">Release Year</label>
        <input
          className="border p-2 w-full"
          type="number"
          min={1888}
          max={2100}
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          required
        />
      </div>

      {/* Actors */}
      <div>
        <label className="block font-medium mb-1">Actors</label>

        <div className="flex gap-2">
          <input
            className="border p-2 flex-1"
            value={actorInput}
            onChange={(e) => setActorInput(e.target.value)}
            placeholder="Add actor"
          />
          <button
            type="button"
            onClick={addActor}
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            Add
          </button>
        </div>

        <ul className="mt-3 space-y-2">
          {actors.map((actor, index) => (
            <li
              key={index}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{actor}</span>
              <button
                type="button"
                onClick={() => removeActor(index)}
                className="text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block font-medium mb-1">Replace Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          className="border p-2 w-full"
        />
      </div>

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Save Changes
      </button>
    </form>
  );
}
