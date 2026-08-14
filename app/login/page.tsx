"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function LoginPage() {
  const router = useRouter(); const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
  async function login(e:React.FormEvent){e.preventDefault();setLoading(true);setError("");const {error}=await createClient().auth.signInWithPassword({email,password});setLoading(false);if(error){setError(error.message);return;}router.push("/movies");router.refresh();}
  return <section className="page"><div className="container"><div className="hero"><div><h1>Staff Login</h1><p className="subtitle">Sign in with your Supabase account.</p></div></div><form className="card form-card" onSubmit={login}>{error&&<div className="notice error">{error}</div>}<div className="form-group"><label className="label" htmlFor="email">Email</label><input className="input" id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div><div className="form-group"><label className="label" htmlFor="password">Password</label><input className="input" id="password" type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></div><button className="btn btn-primary" disabled={loading}>{loading?"Signing in...":"Sign In"}</button></form></div></section>;
}
