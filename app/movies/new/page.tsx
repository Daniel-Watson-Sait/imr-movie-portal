import { MovieForm } from "@/components/MovieForm";
export default function NewMoviePage() {
  return <section className="page"><div className="container"><div className="hero"><div><h1>Add Movie</h1><p className="subtitle">Add a movie to the IMR database.</p></div></div><MovieForm /></div></section>;
}
