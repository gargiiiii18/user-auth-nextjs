import {initMongoose} from "../../../../lib/mongoose";
import User from "../../../../models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../../../../helpers/sendEmail";

export async function POST(request){
    await initMongoose();
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        // console.log(reqBody);
        const userExistingAndVerified = await User.findOne({
            email,
            isVerified: true
        });
        if(userExistingAndVerified){
            return NextResponse.json({error: "User already exists. Please sign in", success: false}, {status: 400});
        }

       const userExistingByEmail = await User.findOne({email});
       const verifyCode = Math.floor(100000 + Math.random()*900000).toString();
       if(userExistingByEmail){
            if(userExistingByEmail.isVerified){
                return NextResponse.json({error: "User already exists with this email,", success: false}, {status: 400});
            } else{
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                userExistingByEmail.password = hashedPassword;
                userExistingByEmail.verifyCode = verifyCode;
                userExistingByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await userExistingByEmail.save();
            }
            // return true;
       } else{

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpiry: expiryDate,
            isVerified: false,
            isAcceptingMessages: true,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
    }

        const emailResponse = await sendVerificationEmail(email, username, verifyCode);
        console.log("email sent");
        
        if(!emailResponse.success){
            return NextResponse.json({error: emailResponse.message, success: false}, {status: 500});
        }
        
        return NextResponse.json({message: "User created successfully. Please verify your email", success: true}, {status: 201});
       

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({error: error.message, message: "Error registering user", success: false}, {status: 500});
    }
}