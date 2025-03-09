import { initMongoose } from "../../../lib/mongoose";
import User from "../../../models/Users";
import { z } from "zod";
import { usernameValidation } from "../../../schemas/signUpSchema";
import { NextResponse } from "next/server";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request) {
    if(request.method !== 'GET'){
        return NextResponse.json({
            success: false,
            message: 'Method not allowed'
        }, {status: 405});
    }
    await initMongoose();
    try {
      const {searchParams} = new URL(request.url);  
      
      const queryParams = {
        username: searchParams.get('username')
      }
    //   console.log(searchParams);
    // console.log(queryParams);
    
      const result = UsernameQuerySchema.safeParse(queryParams);
    //   console.log(result);
      if(!result.success){
        const usernameErrors = result.error.format().username?._errors || [];
        return NextResponse.json({
            success: false,
            message: usernameErrors?.length>0 ? usernameErrors.join(",") : 'Invalid query parameters'
        }, {status: 400});
      }

      const {username} = result.data;
      const existingVerifiedUser = await User.findOne({
        username,
        isVerified: true,
      });

      if(existingVerifiedUser){
        return NextResponse.json({
            success: false,
            message: "Username is already taken"
        }, {status: 400});
      }
      return NextResponse.json({
        success: true,
        message: "Username is available"
    }, {status: 200});
      
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: error.message,
        },
        {status: 500}
    ) 
    }
}
