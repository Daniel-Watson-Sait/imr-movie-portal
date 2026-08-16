"use client"

import {useState} from "react";
import {supabase} from "@/lib/supabase/client";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    async function submit() {
        setError("");
        setMessage("");

        const {error} = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message)
            return;
        }
        setMessage("Account Successfully Created!")
    }

    return (
        <div className="justify-center items-center flex h-screen">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 text-gray-800 border border-gray-700">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {message && <p className="text-green-600 text-center">{message}</p>}

                <div className="flex flex-col space-y-4">
                    <input type="email" placeholder="Enter an email" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-500 rounded-md py-2 px-4"/>
                    <input type="password" placeholder="Enter a password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-500 rounded-md py-2 px-4"/>
                    <button onClick={submit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Create Account</button>
                </div>
            </div>
        </div>
    )
}