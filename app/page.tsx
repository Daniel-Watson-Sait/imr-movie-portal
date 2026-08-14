import Link from "next/link";

export default function HomePage() {
  return (
    <section className="page">
      <div className="container card">
        <h1>IMR Movie Database Portal</h1>
        <p className="subtitle">Manage the Internet Movies Rental Company movie database.</p>
        <div style={{marginTop:24}}>
          <Link className="btn btn-primary" href="/movies">View Movie Database</Link>
        </div>
      </div>
    </section>
  );
}
