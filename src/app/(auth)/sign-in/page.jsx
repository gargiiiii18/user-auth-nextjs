"use client";
import { useSession } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()

  const signIn = () => {
    console.log("tata");
    
  }

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }

  // return <a href="/api/auth/signin">Sign in</a>
  return(
    <div>
      <p>You're not signed in.</p>
      <button onClick={signIn()} className="px-3 py-1 m-2 bg-blue-600 text-white rounded-lg">Sign In</button>
    </div>
  )
}