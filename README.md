# IMR Movie Rental Portal

Skeleton Next.js + Supabase application for the Internet Movies Rental Company assignment.

## Included

- Custom static navbar
- Company/contact footer
- Movie list with title, actors, and release year
- Add movie page
- Edit movie page
- Delete movie action
- Supabase database client setup
- Basic Supabase Auth scaffolding
- SQL schema/seed file
- Responsive styling

## 1. Install

```bash
npm install
```

## 2. Configure Supabase

Create a Supabase project and copy its URL and anon/publishable key into `.env.local` based on `.env.example`.

Then open Supabase SQL Editor and run:

`supabase/schema.sql`

The schema creates a `movies` table and enables Row Level Security. The starter policies allow authenticated users to read/write movies, which gives you a simple foundation for the assignment's authentication requirement.

## 3. Run

```bash
npm run dev
```

Open http://localhost:3000

## VS Code

Open the extracted `imr-movie-portal` folder in VS Code and run the commands above in the integrated terminal.

## Authentication

The project contains Supabase browser/server clients and a login page. To enforce authentication on the movie management pages, the next step is to add a middleware/proxy guard and role-specific permissions. The CRUD UI is intentionally kept simple so it can be extended for the marking criteria.
