"use client";

import {useState} from "react";
import {supabase} from "@/lib/supabase/client";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Invalid Email or Password");
      return;
    }

    router.push("/movies")
  }

  return (
    <div className="justify-center items-center flex h-screen">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 text-gray-800 border border-gray-700">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="flex flex-col space-y-4">
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
            onClick={submit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
            Login
            </button>
        </div>
            <p className="text-center">
            Don't have an account?
            <Link href="/signup" className="text-blue-500 hover:underline text-center">
                Sign up
            </Link>
            </p>
      </div>
    </div>
  )
}