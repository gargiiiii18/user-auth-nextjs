"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";

export default function SignupPage(){

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [isClicked, setIsClicked] = useState(false);

    const handleSignup = async () => {
        console.log(userCreds);
        setIsClicked(true);
    }

    return(
        <div>
        <h1 className="m-2 p-2 text-4xl font-semibold text-center">{!isClicked ? "Signup na" : "Thank you cutie" }<div className="p-2 flex flex-col">
            {!isClicked ? <div><div>🥹</div><div>👉👈</div></div> : <div><div>🤗</div></div>}
            </div></h1>
        <div className="flex flex-col gap-5 items-center">
        <div className="flex">
        <label className="text-lg text-left" htmlFor="username">Username</label>
        <input
         id="username"
         className="ml-2 px-2 py-1 border border-black rounded-lg" 
         required
         type="text" 
         value={userCreds.username}
         onChange={(e) => setUserCreds({...userCreds, username: e.target.value})}
         
         />
        </div>
        <div>
        <label className="text-lg text-left" htmlFor="email">Email</label>
        <input
         id="email"
         className="ml-2 px-2 py-1 border-solid border-black rounded-lg" 
         required
         type="text" 
         value={userCreds.email}
         onChange={(e) => setUserCreds({...userCreds, email: e.target.value})}
         
         />
        </div>
        <div>
        <label className="text-lg" htmlFor="password">Password</label>
        <input
         id="password"
         className="ml-2 px-2 py-1 border-solid border-black rounded-lg" 
         required
         type="password" 
         value={userCreds.password}
         onChange={(e) => setUserCreds({...userCreds, password: e.target.value})}
         />
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
            <button 
            type="submit"
            className="bg-blue-600 px-4 py-1 rounded-lg text-white"
            onSubmit={handleSignup}
            >Sign Up</button>
            <Link href={"/login"}>Login</Link>
        </div>
        </div>
        </div>
    )
}