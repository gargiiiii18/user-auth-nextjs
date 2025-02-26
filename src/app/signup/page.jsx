"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";
import { log } from "util";

export default function SignupPage(){

    const router = useRouter();

    const [userCreds, setUserCreds] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleSignup = async () => {
       try {
         
       } catch (error) {
        console.log(error);
       }
    }

    useEffect(() => {
        if(userCreds.email.length>0 && userCreds.password.length>0 && userCreds.username.length>0){
            setButtonDisabled(!buttonDisabled);
        }
    }, [userCreds]);

    return(
        <div>
        <h1 className="m-2 p-2 text-4xl font-semibold text-center">Signup</h1>
        <div className="flex w-auto flex-col gap-5 items-center">
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
            className={buttonDisabled ? "bg-gray-500 px-4 py-1 rounded-lg text-white cursor-not-allowed" : "bg-blue-600 px-4 py-1 rounded-lg text-white"}
            onClick={handleSignup}
            >Sign Up</button>
            <Link href={"/login"}>Login</Link>
        </div>
        </div>
        </div>
    )
}