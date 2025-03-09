import { initMongoose } from "../../../lib/mongoose";
import User from "../../../models/Users";
import { z } from "zod";
import { usernameValidation } from "../../../schemas/signUpSchema";
import { NextResponse } from "next/server";

export async function POST(request){
    await initMongoose();
    try {
        const {username, code} = await request.json();
        const decodedUsername = decodeURIComponent(username);
        console.log(decodedUsername);
        
        const user = await User.findOne({username: decodedUsername});
        if(!user){
            return NextResponse.json({
                success: false,
                message: 'User not found',
            },
            {status: 500}
        ) 
        }
        const isCodeValid = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true;
            await user.save();

            return NextResponse.json({
                success: true,
                message: 'User successfully verified',
            },
            {status: 200}
        ) 

        } else if(!isCodeNotExpired){
            
            return NextResponse.json({
                success: false,
                message: 'Verification code expired',
            },
            {status: 410}
        ) 
        } else {
            return NextResponse.json({
                success: false,
                message: 'Incorrect verification code',
            },
            {status: 400}
        ) 
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: 'Error verifying code',
        },
        {status: 500}
    ) 
    }
}